import os
import json
from config import config


async def setup_credentials_for_production_env():
    if config.MODE == "production":
        with open("g_document_ai_creds_personal.json", "w") as f:
            json.dump(os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON_CONTENT"), f)
