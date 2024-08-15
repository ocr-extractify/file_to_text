from pydantic_settings import BaseSettings, SettingsConfigDict
import os
from dotenv import load_dotenv

load_dotenv()


class Config(BaseSettings):
    VALID_MIMETYPES: str
    GOOGLE_APPLICATION_CREDENTIALS: str
    G_DOCUMENT_AI_PROJECT_ID: str
    G_DOCUMENT_AI_LOCATION: str
    G_DOCUMENT_AI_PROCESSOR: str
    MONGODB_URL: str
    MONTHLY_UPLOADS_LIMIT: int
    DAILY_UPLOADS_BY_IP_LIMIT: int
    model_config = SettingsConfigDict(env_file=".env", extra="allow")


config = Config()
