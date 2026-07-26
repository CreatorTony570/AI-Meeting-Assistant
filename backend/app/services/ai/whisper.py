import openai
from app.core.config import settings

class WhisperService:
    def __init__(self):
        self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

    async def transcribe(self, file_path: str) -> dict:
        """
        Transcribes audio file using OpenAI Whisper API.
        """
        try:
            with open(file_path, "rb") as audio_file:
                transcript = self.client.audio.transcriptions.create(
                    model="whisper-1", 
                    file=audio_file,
                    response_format="verbose_json",
                    timestamp_granularities=["segment"]
                )
            return transcript.model_dump()
        except Exception as e:
            # Log error and raise custom exception
            print(f"Whisper transcription failed: {e}")
            raise e

whisper_service = WhisperService()
