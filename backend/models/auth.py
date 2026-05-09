from sqlalchemy import Column, Integer, String
from app.database import Base

class Authentication(Base):
    __tablename__ = "auth"

    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True)
    password = Column(String(255))