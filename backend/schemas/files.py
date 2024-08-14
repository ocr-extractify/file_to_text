from datetime import datetime
from typing import Optional, Annotated
from pydantic import BaseModel, ConfigDict, Field, BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]


class FileModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field()
    analysis: dict = Field()
    created_at: datetime = Field(default=datetime.now())
    is_deleted: bool = Field(default=0)
    client_ip: str

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
