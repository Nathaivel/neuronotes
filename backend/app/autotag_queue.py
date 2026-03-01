import asyncio
from bson import ObjectId

from app.database import notes_collection
from app.tagger import extract_tags

tag_queue = asyncio.Queue()

async def autotag_job(note_id: str, text: str):
    loop = asyncio.get_running_loop()

    tags = await loop.run_in_executor(
        None,
        extract_tags,
        text,
    )

    await notes_collection.update_one(
        {"_id": ObjectId(note_id)},
        {"$set": {"tags": tags}}
    )
    #print("Tags saved for", note_id, tags)

async def tag_worker():
    while True:
        note_id, text = await tag_queue.get()
        try:
            await autotag_job(note_id, text)
        except Exception as e:
            print(f"Error processing autotag for note {note_id}: {e}")
        finally:
            tag_queue.task_done()

async def start_tag_workers(count=2):
    for i in range(count):
        asyncio.create_task(tag_worker())

async def enqueue_autotag(note_id: str, text: str):
    await tag_queue.put((note_id, text))