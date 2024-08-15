from datetime import datetime, timedelta, timezone
from constants.errors_texts import CLIENT_DAY_LIMIT_REACHED, MONTHLY_LIMIT_REACHED
from routes.files import files_router
from fastapi import HTTPException, UploadFile, status, Request
from db import db
from schemas.files import FileModel
from utils.documentai.analyze import analyze_file
from utils.documentai.clean import clean_document_ai_analysis
from config import config


@files_router.post(
    "/upload/",
    description="Upload a file.",
    status_code=status.HTTP_201_CREATED,
    response_model=FileModel,
)
async def upload(file: UploadFile, request: Request):
    files_collection = db.get_collection("files")

    client_daily_uploads_qty = await files_collection.count_documents(
        {"client_ip": request.client.host}
    )
    if client_daily_uploads_qty > config.DAILY_UPLOADS_BY_IP_LIMIT:
        raise HTTPException(status_code=400, detail={CLIENT_DAY_LIMIT_REACHED})

    now = datetime.now(timezone.utc)
    last_month = now - timedelta(days=30)
    current_month_uploads_qty = await files_collection.count_documents(
        {"created_at": {"$gte": last_month}}
    )

    if current_month_uploads_qty > config.MONTHLY_UPLOADS_LIMIT:
        raise HTTPException(status_code=400, detail={MONTHLY_LIMIT_REACHED})

    analyzed_file = await analyze_file(file)
    analyzed_file = await clean_document_ai_analysis(analyzed_file)
    file = FileModel(
        name=file.filename, analysis=analyzed_file, client_ip=request.client.host
    )
    file_dict = file.model_dump(by_alias=True, exclude=["id"])
    new_db_file = await files_collection.insert_one(file_dict)
    created_file = await files_collection.find_one({"_id": new_db_file.inserted_id})
    return created_file
