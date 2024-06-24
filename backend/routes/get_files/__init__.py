from fastapi import APIRouter

get_files_router = APIRouter(
    # prefix="/",
    tags=["get files"],
)


from routes.get_files.routes import *
