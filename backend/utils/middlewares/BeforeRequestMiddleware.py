from typing import Any
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware


class BeforeRequestMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Any) -> Response:
        # store x-vercel-oidc-token header
        request_headers = request.headers
        print("request_headers: ", request_headers)
        self.app.x_vercel_oidc_token = request_headers.get("x-vercel-oidc-token")

        return await call_next(request)
