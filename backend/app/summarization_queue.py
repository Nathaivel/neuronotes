import asyncio
from datetime import datetime
from bson import ObjectId
from app.database import notes_collection
from app.summarizer import generate_summary

summarizer_queue = asyncio.Queue()

CONCURRENCY_LIMIT = 2
semaphore = asyncio.Semaphore(CONCURRENCY_LIMIT)

async def summarizer_job(note_id: str, text: str):
    await notes_collection.update_one(
    {"_id": ObjectId(note_id)},
    {"$set": {"summary_status": "processing"}}
    )
    loop = asyncio.get_running_loop()

    async with semaphore:
        try:
            result = await loop.run_in_executor(
                None,
                generate_summary,
                text,
            )
            #print(text)
            #print(result)

            if not result.get("success"):
                await notes_collection.update_one(
                    {"_id": ObjectId(note_id)},
                    {
                        "$set": {
                            "summary_status": "failed",
                            "summary_error": result.get("error"),
                            "updated_at": datetime.utcnow(),
                        }
                    }
                )
                return

            await notes_collection.update_one(
                {"_id": ObjectId(note_id)},
                {
                    "$set": {
                        "summary": result["summary"],
                        "summary_metrics": result["metrics"],
                        "summary_review": result["review"],
                        "summary_status": "completed",
                        "updated_at": datetime.utcnow(),
                    }
                }
            )

        except Exception as e:
            await notes_collection.update_one(
                {"_id": ObjectId(note_id)},
                {
                    "$set": {
                        "summary_status": "error",
                        "summary_error": str(e),
                        "updated_at": datetime.utcnow(),
                    }
                }
            )



async def summarizer_worker():
    while True:
        note_id, text = await summarizer_queue.get()

        try:
            await summarizer_job(note_id, text)
        finally:
            summarizer_queue.task_done()



async def start_summarizer_workers(count: int = 1):
    for _ in range(count):
        asyncio.create_task(summarizer_worker())