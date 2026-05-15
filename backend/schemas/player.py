from pydantic import BaseModel

class PlayerCreate(BaseModel):
    name: str
    age: int
    gender: str
    city: str
    state: str
    mobile: str
    weight: int
    category: str


class PlayerUpdate(BaseModel):
    name: str | None = None
    age: int | None = None
    gender: str | None = None
    city: str | None = None
    state: str | None = None
    mobile: str | None = None
    weight: int | None = None
    category: str | None = None