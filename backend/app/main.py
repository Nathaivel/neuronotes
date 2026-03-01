from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router

from app.autotag_queue import start_tag_workers
from app.summarization_queue import start_summarizer_workers
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    await start_tag_workers()
    await start_summarizer_workers()
    #print("Tag workers started")
    yield
    #print("Shutting down tag workers...")

app = FastAPI(title="Notes App Backend", lifespan=lifespan)

app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get("/")
async def root():
    return {"status": "200"}
