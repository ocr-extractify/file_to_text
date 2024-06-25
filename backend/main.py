from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.get_files import get_files_router
from routes.upload import upload_router
from utils.middlewares import ExceptionHandlerMiddleware

app = FastAPI(
    title="Files to text",
    version="1.0.0",
)

app.include_router(get_files_router)
app.include_router(upload_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(ExceptionHandlerMiddleware)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
