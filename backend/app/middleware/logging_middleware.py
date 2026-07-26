import time
import structlog
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request

logger = structlog.get_logger()

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Log request info
        client_ip = request.client.host
        method = request.method
        url = str(request.url)
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        
        # Security: Don't log sensitive path contents or full body in production logs
        logger.info(
            "api_request",
            method=method,
            path=url,
            status_code=response.status_code,
            duration=f"{process_time:.4f}s",
            client_ip=client_ip
        )
        
        return response
