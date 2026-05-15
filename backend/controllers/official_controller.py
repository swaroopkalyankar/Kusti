from sqlalchemy.orm import Session
from services import official_service
from schemas.official import OfficialCreate, OfficialUpdate


def get_officials(db: Session):
    return official_service.get_officials(db)


def get_official(db: Session, official_id: int):
    return official_service.get_official(db, official_id)


def create_official(db: Session, data: OfficialCreate):
    return official_service.create_official(db, data)


def update_official(db: Session, official_id: int, data: OfficialUpdate):
    return official_service.update_official(db, official_id, data)


def delete_official(db: Session, official_id: int):
    return official_service.delete_official(db, official_id)