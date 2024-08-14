from pydantic import BaseModel


class Stat(BaseModel):
    uploaded_files_qty: int
    uploaded_files_qty_today: int
    uploaded_files_qty_week: int
    uploaded_files_qty_month: int
