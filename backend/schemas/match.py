from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class MatchCreate(BaseModel):
    wrestlerA: str
    wrestlerB: str
    official: Optional[str] = None
    tournamentId: Optional[str] = None
    venue: Optional[str] = None
    matchDateTime: Optional[datetime] = None
    status: Optional[str] = "upcoming"