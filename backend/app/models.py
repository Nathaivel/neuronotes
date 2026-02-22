from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


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
    reviews: List[datetime]
