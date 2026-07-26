from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db.session import get_db
from app.models.models import User, UserSettings
from app.schemas.settings import UserSettingsCreate, UserSettingsUpdate, UserSettingsResponse

router = APIRouter()

SUPPORTED_PROVIDERS = {
    "openai":     ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
    "gemini":     ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro"],
    "openrouter": ["meta-llama/llama-3-70b-instruct", "mistralai/mistral-7b-instruct", "anthropic/claude-3-haiku"],
}


@router.get("/providers")
def list_providers():
    """Return available providers and their models — no auth required."""
    return SUPPORTED_PROVIDERS


@router.get("/me", response_model=UserSettingsResponse)
def get_my_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
):
    settings = db.query(UserSettings).filter(UserSettings.user_id == current_user.id).first()
    if not settings:
        # Return defaults if not configured yet
        return UserSettingsResponse(
            id=current_user.id,
            user_id=current_user.id,
            ai_provider="gemini",
            ai_model="gemini-1.5-flash",
            encrypted_api_key="",
        )
    return settings


@router.put("/me", response_model=UserSettingsResponse)
def update_my_settings(
    *,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
    settings_in: UserSettingsUpdate,
):
    if settings_in.ai_provider and settings_in.ai_provider not in SUPPORTED_PROVIDERS:
        raise HTTPException(status_code=400, detail=f"Unsupported provider: {settings_in.ai_provider}")

    settings = db.query(UserSettings).filter(UserSettings.user_id == current_user.id).first()

    if not settings:
        settings = UserSettings(
            user_id=current_user.id,
            ai_provider=settings_in.ai_provider or "gemini",
            ai_model=settings_in.ai_model or "gemini-1.5-flash",
            encrypted_api_key=settings_in.encrypted_api_key or "",
        )
        db.add(settings)
    else:
        if settings_in.ai_provider is not None:
            settings.ai_provider = settings_in.ai_provider
        if settings_in.ai_model is not None:
            settings.ai_model = settings_in.ai_model
        if settings_in.encrypted_api_key is not None:
            settings.encrypted_api_key = settings_in.encrypted_api_key

    db.commit()
    db.refresh(settings)
    return settings
