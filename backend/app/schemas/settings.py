from typing import Optional
from pydantic import BaseModel
import uuid
from datetime import datetime


class UserSettingsBase(BaseModel):
    ai_provider: Optional[str] = "gemini"   # openai | gemini | openrouter
    ai_model: Optional[str] = ""
    encrypted_api_key: Optional[str] = ""


class UserSettingsCreate(UserSettingsBase):
    pass


class UserSettingsUpdate(UserSettingsBase):
    pass


class UserSettingsResponse(UserSettingsBase):
    id: uuid.UUID
    user_id: uuid.UUID
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
