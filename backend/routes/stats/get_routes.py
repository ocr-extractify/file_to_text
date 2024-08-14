from datetime import datetime, timedelta, timezone
from db.schemas import Stat
from routes.stats import stats_router
from fastapi import status
from db import db


@stats_router.get(
    "/",
    description="Get stats for the uploaded files",
    status_code=status.HTTP_200_OK,
    response_model=Stat,
)
async def get_stat():
    files_collection = db.get_collection("files")

    uploaded_files_qty = await files_collection.count_documents({})
    now = datetime.now(timezone.utc)

    last_month = now - timedelta(days=30)
    uploaded_files_qty_month = await files_collection.count_documents(
        {"created_at": {"$gte": last_month}}
    )

    start_of_day = datetime(now.year, now.month, now.day)
    uploaded_files_qty_today = await files_collection.count_documents(
        {"created_at": {"$gte": start_of_day}}
    )

    last_week = now - timedelta(weeks=1)
    uploaded_files_qty_week = await files_collection.count_documents(
        {"created_at": {"$gte": last_week}}
    )

    return Stat(
        uploaded_files_qty=uploaded_files_qty,
        uploaded_files_qty_month=uploaded_files_qty_month,
        uploaded_files_qty_today=uploaded_files_qty_today,
        uploaded_files_qty_week=uploaded_files_qty_week,
    )
