from motor.motor_asyncio import AsyncIOMotorClient
from config import config

client = AsyncIOMotorClient(config.MONGODB_URL)
db = client["file_to_text"]


async def setup_db():
    collection_list = await db.list_collection_names()

    if "files" not in collection_list:
        await db.create_collection("files")

    # global db.get_collection('files')
    # db.get_collection('files') = db.get_collection("files")
