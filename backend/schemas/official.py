from pydantic import BaseModel


class OfficialBase(BaseModel):
    name: str
    age: int
    mobile: str
    city: str
    state: str
    role: str
    gender: str


class OfficialCreate(OfficialBase):
    pass


class OfficialUpdate(OfficialBase):
    pass


class OfficialResponse(OfficialBase):
    id: int

    class Config:
        from_attributes = True