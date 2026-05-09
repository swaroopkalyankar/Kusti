from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    is_deleted = Column(Boolean, default=False)