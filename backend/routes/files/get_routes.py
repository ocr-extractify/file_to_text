from constants.errors_texts import FILE_NOT_FOUND, INVALID_FILE_ID
from routes.files import files_router
from fastapi import HTTPException, status
from db import files_collection
from db.schemas.files import FileModel, FilesCollection
from bson import ObjectId


@files_router.get(
    "/",
    description="get all files",
    status_code=status.HTTP_200_OK,
)
async def get_files():
    return FilesCollection(files=await files_collection.find().to_list(1000))


@files_router.get(
    "/{id}",
    description="get a file by id",
    status_code=status.HTTP_200_OK,
    response_model=FileModel,
)
async def get_file(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail={INVALID_FILE_ID})

    file = await files_collection.find_one({"_id": ObjectId(id)})
    print("file: ", file)
    if file is None:
        raise HTTPException(status_code=404, detail={FILE_NOT_FOUND})

    return file
