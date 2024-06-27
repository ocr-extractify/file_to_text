from routes.upload import upload_router
from fastapi import UploadFile, status
from db import files_collection
from db.schemas.files import FileModel
from utils.documentai.analyze import analyze_file
from utils.documentai.clean import clean_document_ai_analysis


@upload_router.post(
    "/",
    description="Upload a file.",
    status_code=status.HTTP_201_CREATED,
    response_model=FileModel,
)
async def upload(file: UploadFile):
    analyzed_file = await analyze_file(file)
    analyzed_file = await clean_document_ai_analysis(analyzed_file)
    print("analyzed file")
    file = FileModel(name=file.filename, analysis=analyzed_file)
    file_dict = file.model_dump(by_alias=True, exclude=["id"])
    new_db_file = await files_collection.insert_one(file_dict)
    created_file = await files_collection.find_one({"_id": new_db_file.inserted_id})
    return created_file
