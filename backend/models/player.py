from sqlalchemy import Column, Integer, String
from database import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    age = Column(Integer)
    gender = Column(String(20))
    city = Column(String(100))
    state = Column(String(100))
    mobile = Column(String(20))
    weight = Column(Integer)
    category = Column(String(50))