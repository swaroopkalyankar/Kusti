from sqlalchemy.orm import Session
from models.official import Official
from schemas.official import OfficialCreate, OfficialUpdate


# GET ALL
def get_officials(db: Session):
    return db.query(Official).all()


# GET ONE
def get_official(db: Session, official_id: int):
    return db.query(Official).filter(Official.id == official_id).first()


# CREATE
def create_official(db: Session, data: OfficialCreate):
    new_official = Official(
        name=data.name,
        age=data.age,
        mobile=data.mobile,
        city=data.city,
        state=data.state,
        role=data.role,
        gender=data.gender,
    )

    db.add(new_official)
    db.commit()
    db.refresh(new_official)

    return new_official


# UPDATE
def update_official(db: Session, official_id: int, data: OfficialUpdate):
    official = db.query(Official).filter(Official.id == official_id).first()

    if not official:
        return None

    for key, value in data.dict().items():
        setattr(official, key, value)

    db.commit()
    db.refresh(official)

    return official


# DELETE
def delete_official(db: Session, official_id: int):
    official = db.query(Official).filter(Official.id == official_id).first()

    if not official:
        return None

    db.delete(official)
    db.commit()

    return {"message": "Official deleted successfully"}