from datetime import datetime
from subprocess import REALTIME_PRIORITY_CLASS

from bson import ObjectId
from fastapi import APIRouter, HTTPException

from app.database import notes_collection
from app.models import NoteCreate, NoteUpdate

router = APIRouter(prefix="/notes", tags=["Notes"])


def note_serializer(note) -> dict:
    res = {
        "id": str(note["_id"]),
        "title": note["title"],
        "content": note["content"],
        "created_at": note["created_at"],
        "updated_at": note["updated_at"],
    }

    try:
        res["reviews"] = note["reviews"]
    except KeyError:
        print("Missing values")

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
    }
    result = await notes_collection.insert_one(new_note)
    return {"id": str(result.inserted_id)}


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
    if not review:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
    else:
        try:
            prev_reviews = await get_note(note_id)
            update_data = {"reviews": prev_reviews["reviews"] + [datetime.utcnow()]}
        except KeyError:
            update_data = {"reviews": [datetime.utcnow()]}

    result = await notes_collection.update_one(
        {"_id": ObjectId(note_id)}, {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")

    return {"message": "Note updated"}


@router.delete("/{note_id}")
async def delete_note(note_id: str):
    result = await notes_collection.delete_one({"_id": ObjectId(note_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted"}
