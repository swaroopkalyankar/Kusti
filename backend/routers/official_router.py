from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from schemas.official import OfficialCreate, OfficialUpdate
import controllers.official_controller as controller

router = APIRouter(prefix="/officials", tags=["Officials"])


# GET ALL
@router.get("/")
def get_officials(db: Session = Depends(get_db)):
    return controller.get_officials(db)


# GET ONE
@router.get("/{official_id}")
def get_official(official_id: int, db: Session = Depends(get_db)):
    return controller.get_official(db, official_id)


# CREATE
@router.post("/")
def create_official(data: OfficialCreate, db: Session = Depends(get_db)):
    return controller.create_official(db, data)


# UPDATE
@router.put("/{official_id}")
def update_official(
    official_id: int,
    data: OfficialUpdate,
    db: Session = Depends(get_db),
):
    return controller.update_official(db, official_id, data)


# DELETE
@router.delete("/{official_id}")
def delete_official(official_id: int, db: Session = Depends(get_db)):
    return controller.delete_official(db, official_id)