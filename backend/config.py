from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    VALID_MIMETYPES: str
    G_DOCUMENT_AI_PROJECT_ID: str
    G_DOCUMENT_AI_LOCATION: str
    G_DOCUMENT_AI_PROCESSOR: str
    MONGODB_URL: str

    model_config = SettingsConfigDict(env_file=".env", extra="allow")


config = Config()
