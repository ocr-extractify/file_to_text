from fastapi import FastAPI
from routes.get_files import get_files_router
from routes.upload import upload_router

app = FastAPI(
    title="Files to text",
    version="1.0.0",
)

app.include_router(get_files_router)
app.include_router(upload_router)

# app.add_middleware(
#     COMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
