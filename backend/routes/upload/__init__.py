from fastapi import APIRouter

upload_router = APIRouter(
    prefix="/upload",
    tags=["upload"],
)

from routes.upload.routes import *
