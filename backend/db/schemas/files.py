from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field
from db.schemas import PyObjectId


class FileModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field()
    analysis: dict = Field()
    created_at: datetime = Field(default=datetime.now())
    is_deleted: bool = Field(default=0)

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "invoice file",
                "created_at": datetime(2024, 6, 24, 12, 16, 55, 696065),
                "is_deleted": False,
            }
        }
    )


class FilesCollection(BaseModel):
    files: list[FileModel]
