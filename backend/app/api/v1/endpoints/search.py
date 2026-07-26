from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from app.api import deps
from app.db.session import get_db
from app.services.vector_service import vector_service

router = APIRouter()

@router.get("/semantic")
async def semantic_search(
    q: str = Query(..., min_length=2),
    current_user = Depends(deps.get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Perform natural language search across all user meetings using vector embeddings.
    Example: "Find the meeting where we discussed the Q3 budget"
    """
    results = await vector_service.semantic_search(q, current_user.id)
    return {
        "query": q,
        "results": results
    }

@router.get("/suggestions")
async def get_search_suggestions(
    q: str = Query(...),
    current_user = Depends(deps.get_current_active_user)
):
    # Logic for auto-complete suggestions
    return ["Q3 Budget Planning", "Client Onboarding Sync", "Product Roadmap 2026"]
