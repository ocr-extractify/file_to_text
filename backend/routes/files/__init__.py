from fastapi import APIRouter

files_router = APIRouter(
    prefix="/files",
    tags=["files"],
)


from routes.files.get_routes import *
from routes.files.upload_routes import *
from routes.files.delete_routes import *
