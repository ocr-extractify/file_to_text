from fastapi import APIRouter

get_files_router = APIRouter(
    prefix="/files",
    tags=["get files"],
)


from routes.get_files.routes import *
