from motor.motor_asyncio import AsyncIOMotorClient
from config import config

client = AsyncIOMotorClient(config.MONGODB_URL)
db = client.get_database("file_to_text")
files_collection = db.get_collection("files")
