from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
import uuid
import os
from app.db.session import get_db
from app.models.models import Meeting, User
from app.services.ai.whisper import whisper_service
from app.services.ai.gpt import gpt_service
from app.core.config import settings

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

from app.services.ai.factory import AIFactory
from app.services.ai.prompts import MEETING_SUMMARY_SYSTEM_PROMPT

from app.core.websocket import manager

async def process_meeting_task(meeting_id: uuid.UUID, file_path: str, db: Session, provider: str = "openai"):
    # ... previous code ...
    try:
        await manager.send_personal_message({"status": "PROCESSING", "step": "transcribing"}, str(meeting.user_id))
        
        # ... logic ...
        
        await manager.send_personal_message({"status": "COMPLETED", "meeting_id": str(meeting_id)}, str(meeting.user_id))

        # 1. Factory initialization
        llm_service = AIFactory.get_llm_provider(provider)
        stt_service = AIFactory.get_transcription_provider("openai") # Whisper as default

        # 2. Transcribe
        transcript_data = await stt_service.transcribe(file_path)
        
        # 3. Analyze using chosen provider
        analysis = await llm_service.generate_summary(
            transcript_data['text'], 
            MEETING_SUMMARY_SYSTEM_PROMPT
        )

        # 4. Save results (Logic continued...)
        meeting.status = "COMPLETED"
        db.commit()
    except Exception as e:
        meeting.status = "FAILED"
        db.commit()
        print(f"Failed to process meeting {meeting_id} with {provider}: {e}")

@router.post("/upload")
async def upload_meeting(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    provider: str = "openai",
    db: Session = Depends(get_db),
):
    # ... previous upload logic ...
    # background_tasks.add_task(process_meeting_task, new_meeting.id, file_path, db, provider)
    file_id = uuid.uuid4()
    file_extension = file.filename.split(".")[-1]
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.{file_extension}")
    
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    new_meeting = Meeting(
        id=file_id,
        title=file.filename,
        original_filename=file.filename,
        s3_key=file_path, # Local path for demo
        status="PENDING",
        user_id=None # Link to current_user.id in production
    )
    db.add(new_meeting)
    db.commit()

    background_tasks.add_task(process_meeting_task, new_meeting.id, file_path, db)

    return {"message": "Upload successful, processing started", "meeting_id": new_meeting.id}

@router.get("/")
def list_meetings(db: Session = Depends(get_db)):
    return db.query(Meeting).all()
