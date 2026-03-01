import asyncio
import time
from bson import ObjectId

from app.database import notes_collection
from app.tagger import generate_tags 

TAG_TIMEOUT_SECONDS = 45
MAX_AUTOTAG_RETRIES = 2

tag_queue = asyncio.Queue()

async def autotag_job(note_id: str, text: str):
    loop = asyncio.get_running_loop()
    for attempt in range(MAX_AUTOTAG_RETRIES):
        try:
            start = time.time()

            tags = await asyncio.wait_for(
                loop.run_in_executor(
                    None,
                    generate_tags,
                    text,
                ),
                timeout=TAG_TIMEOUT_SECONDS
            )

            latency = round(time.time() - start, 3)

            await notes_collection.update_one(
                {"_id": ObjectId(note_id)},
                {
                    "$set": {
                        "tags": tags,
                        "tag_metadata": {
                            "generated": True,
                            "latency_seconds": latency,
                            "tag_count": len(tags)
                        }
                    }
                }
            )

            return

        except asyncio.TimeoutError:
            print(f"[AutoTag] Timeout for note {note_id}")
        except Exception as e:
            print(f"[AutoTag] Error attempt {attempt+1} for {note_id}: {e}")

    await notes_collection.update_one(
        {"_id": ObjectId(note_id)},
        {
            "$set": {
                "tags": [],
                "tag_metadata": {
                    "generated": False,
                    "error": "Tag generation failed"
                }
            }
        }
    )

async def tag_worker():
    while True:
        note_id, text = await tag_queue.get()
        try:
            await autotag_job(note_id, text)
        except Exception as e:
            print(f"[Worker] Unexpected error for note {note_id}: {e}")
        finally:
            tag_queue.task_done()

async def start_tag_workers(count: int = 2):
    for _ in range(count):
        asyncio.create_task(tag_worker())

async def enqueue_autotag(note_id: str, text: str):
    await tag_queue.put((note_id, text))