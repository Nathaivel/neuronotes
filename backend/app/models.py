from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class NoteCreate(BaseModel):
    title: str = Field(..., max_length=200)
    content: str

class NoteUpdate(BaseModel):
    title: Optional[str]
    content: Optional[str]

class NoteResponse(BaseModel):
    id: str
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
