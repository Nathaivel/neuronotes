from datetime import datetime, timedelta

from bson import ObjectId
from fastapi import APIRouter, HTTPException

from app.database import notes_collection
from app.models import NoteCreate, NoteUpdate
from app.utils import is_same_week

from app.autotag_queue import enqueue_autotag

router = APIRouter(prefix="/notes", tags=["Notes"])


def note_serializer(note) -> dict:
    res = {
        "id": str(note["_id"]),
        "title": note["title"],
        "content": note["content"],
        "created_at": note["created_at"],
        "updated_at": note["updated_at"],
        "reviews": note.get("reviews", []),
        "tags": note.get("tags", []),
    }
    return res


@router.post("/")
async def create_note(note: NoteCreate):
    now = datetime.utcnow()
    new_note = {
        "title": note.title,
        "content": note.content,
        "created_at": now,
        "updated_at": now,
        "reviews": [],
        "tags": [],
    }
    result = await notes_collection.insert_one(new_note)
    note_id = str(result.inserted_id)
    await enqueue_autotag(note_id, note.content)
    return {"id": note_id}


@router.get("/")
async def get_all_notes():
    notes = []
    async for note in notes_collection.find():
        notes.append(note_serializer(note))
    return notes


@router.get("/{note_id}")
async def get_note(note_id: str):
    note = await notes_collection.find_one({"_id": ObjectId(note_id)})
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note_serializer(note)


@router.put("/{note_id}")
async def update_note(note_id: str, data: NoteUpdate, review: bool = False):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()

    result = await notes_collection.update_one(
        {"_id": ObjectId(note_id)}, {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")

    if data.content is not None:
        await enqueue_autotag(note_id, data.content)
        
    return {"message": "Note updated"}


@router.patch("/review/{note_id}/")
async def mark_review(note_id: str):
    prev_reviews = await get_note(note_id)
    today = datetime.utcnow()

    try:
        if prev_reviews["reviews"][-1].date() != today.date():
            update_data = {"reviews": prev_reviews["reviews"] + [today]}
        else:
            update_data = {"reviews": prev_reviews["reviews"]}
            print("duplicate")
    except IndexError:
        update_data = {"reviews": [today]}

    result = await notes_collection.update_one(
        {"_id": ObjectId(note_id)}, {"$set": update_data}
    )


@router.get("/reviews/weekly")
async def get_weekly_review():
    notes = await get_all_notes()
    week = [
        {"name": "Monday", "reviews": 0},
        {"name": "Tuesday", "reviews": 0},
        {"name": "Wednesday", "reviews": 0},
        {"name": "Thursday", "reviews": 0},
        {"name": "Friday", "reviews": 0},
        {"name": "Saturday", "reviews": 0},
        {"name": "Sunday", "reviews": 0},
    ]
    today = datetime.utcnow()

    for note in notes:
        index = len(note["reviews"]) - 1

        while index >= 0:
            if is_same_week(note["reviews"][index], today):
                week[note["reviews"][index].weekday()]["reviews"] += 1
                index -= 1
            else:
                break

    return week


@router.delete("/{note_id}")
async def delete_note(note_id: str):
    result = await notes_collection.delete_one({"_id": ObjectId(note_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted"}
