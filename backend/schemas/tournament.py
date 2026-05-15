from pydantic import BaseModel
from datetime import date

class TournamentCreate(BaseModel):
    name: str
    organizer: str
    start_date: date
    end_date: date
    venue: str
    city: str
    state: str


class TournamentUpdate(BaseModel):
    name: str | None = None
    organizer: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    venue: str | None = None
    city: str | None = None
    state: str | None = None