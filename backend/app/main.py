from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="Notes App Backend")

app.include_router(router)

@app.get("/")
async def root():
    return {"status": "Backend running 🚀"}
