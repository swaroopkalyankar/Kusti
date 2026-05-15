from sqlalchemy import Column, Integer, String
from database import Base


class Official(Base):
    __tablename__ = "officials"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100))
    age = Column(Integer)

    mobile = Column(String(15))
    city = Column(String(100))
    state = Column(String(100))
    role = Column(String(50))
    gender = Column(String(10))