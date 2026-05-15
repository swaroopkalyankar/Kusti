from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    wrestlerA = Column(String(100), nullable=False)
    wrestlerB = Column(String(100), nullable=False)
    official = Column(String(100))
    tournamentId = Column(String(100))
    venue = Column(String(100))
    matchDateTime = Column(DateTime)
    status = Column(String(20), default="upcoming")