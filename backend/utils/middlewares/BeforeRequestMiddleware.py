from typing import Any
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware


class BeforeRequestMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Any) -> Response:
        # store z-vercel-oidc-token header
        request_headers = request.headers
        if "x-vercel-oidc-token" in request_headers:
            with open("x-vercel-oidc-token.txt") as file:
                file.write(request_headers.get("x-vercel-oidc-token", ""))

        return await call_next(request)
