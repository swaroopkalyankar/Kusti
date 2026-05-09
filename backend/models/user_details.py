from sqlalchemy import Column, Integer, String
from app.database import Base

class UserDetails(Base):
    __tablename__ = "user_details"

    id = Column(Integer, primary_key=True)
    full_name = Column(String(100))
    phone = Column(String(15))