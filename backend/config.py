from typing import Any, Optional
from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()


class Config(BaseSettings):
    MODE: str
    VALID_MIMETYPES: str
    GOOGLE_APPLICATION_CREDENTIALS: str
    G_DOCUMENT_AI_PROJECT_ID: str
    G_DOCUMENT_AI_LOCATION: str
    G_DOCUMENT_AI_PROCESSOR: str
    MONGODB_URL: Optional[str] = None
    MONGODB_URL_DEV: Optional[str] = None
    MONGODB_URL_PROD: Optional[str] = None
    MONTHLY_UPLOADS_LIMIT: int
    DAILY_UPLOADS_BY_IP_LIMIT: int
    UNRESTRICTED_IPS: str
    model_config = SettingsConfigDict(env_file=".env", extra="allow")

    @model_validator(mode="before")
    def set_mongodb_attr(cls, values: Any):
        mode = values.get("MODE")

        if mode == "development":
            values["MONGODB_URL"] = values.get("MONGODB_URL_DEV")
        elif mode == "production":
            values["MONGODB_URL"] = values.get("MONGODB_URL_PROD")

        return values


config = Config()
