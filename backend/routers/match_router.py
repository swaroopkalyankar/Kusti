from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from schemas.match import MatchCreate
from controllers.match_controller import (
    create_match_controller,
    get_matches_controller,
    update_match_controller,
    delete_match_controller,
)

router = APIRouter(
    prefix="/matches",
    tags=["Matches"]
)

@router.post("/")
def create_match(data: MatchCreate, db: Session = Depends(get_db)):
    return create_match_controller(data, db)

@router.get("/")
def get_matches(db: Session = Depends(get_db)):
    return get_matches_controller(db)

@router.put("/{match_id}")
def update_match(
    match_id: int,
    data: MatchCreate,
    db: Session = Depends(get_db)
):
    return update_match_controller(match_id, data, db)

@router.delete("/{match_id}")
def delete_match(
    match_id: int,
    db: Session = Depends(get_db)
):
    return delete_match_controller(match_id, db)