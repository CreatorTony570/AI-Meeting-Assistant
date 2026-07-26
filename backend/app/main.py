from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.api.v1 import api_router
from app.middleware.security_headers import SecurityHeadersMiddleware
from app.middleware.logging_middleware import LoggingMiddleware

limiter = Limiter(key_func=get_remote_address)

def get_application() -> FastAPI:
    _app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
    )

    # Rate Limiting
    _app.state.limiter = limiter
    _app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    # Middlewares (Ordered from outer to inner)
    _app.add_middleware(LoggingMiddleware)
    _app.add_middleware(SecurityHeadersMiddleware)
    _app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

from app.core.websocket import manager

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(user_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle incoming client messages if necessary
    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)

app.include_router(api_router, prefix=settings.API_V1_STR)

    # Internal Health Checks
    @_app.get("/health")
    async def health_check():
        return {"status": "healthy"}

    return _app

app = get_application()

@app.get("/")
@limiter.limit("60/minute")
async def root(request: Request):
    return {"message": "Welcome to the AI Meeting Assistant API"}
