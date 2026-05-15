from sqlalchemy import Column, Integer, String, Date
from database import Base

class Tournament(Base):
    __tablename__ = "tournaments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    organizer = Column(String(255))
    start_date = Column(Date)
    end_date = Column(Date)
    venue = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))