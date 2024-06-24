from routes.get_files import get_files_router
from fastapi import UploadFile, status
from db import files_collection
from db.schemas.files import FilesCollection


@get_files_router.get("/", description="get all files", status_code=status.HTTP_200_OK)
async def get_files():
    return FilesCollection(files=await files_collection.find().to_list(1000))
