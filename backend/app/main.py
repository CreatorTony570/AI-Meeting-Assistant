from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.websockets import WebSocket, WebSocketDisconnect
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.api.v1 import api_router
from app.core.websocket import manager
from app.middleware.security_headers import SecurityHeadersMiddleware
from app.middleware.logging_middleware import LoggingMiddleware

limiter = Limiter(key_func=get_remote_address)


def get_application() -> FastAPI:
    _app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
    )

    # Rate limiting
    _app.state.limiter = limiter
    _app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    # Middlewares (outer → inner)
    _app.add_middleware(LoggingMiddleware)
    _app.add_middleware(SecurityHeadersMiddleware)
    _app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    _app.include_router(api_router, prefix=settings.API_V1_STR)

    # Health check
    @_app.get("/health")
    async def health_check():
        return {"status": "healthy"}

    return _app


app = get_application()


@app.get("/")
@limiter.limit("60/minute")
async def root(request: Request):
    return {"message": "Welcome to the AI Meeting Assistant API"}


@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(user_id, websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(user_id, websocket)
