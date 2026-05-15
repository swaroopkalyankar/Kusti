from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers import tournament_controller
from schemas.tournament import TournamentCreate, TournamentUpdate

router = APIRouter(prefix="/tournaments", tags=["Tournaments"])


@router.get("/")
def get_all(db: Session = Depends(get_db)):
    return tournament_controller.get_all(db)


@router.post("/")
def create(data: TournamentCreate, db: Session = Depends(get_db)):
    return tournament_controller.create(db, data)


@router.put("/{tournament_id}")
def update(tournament_id: int, data: TournamentUpdate, db: Session = Depends(get_db)):
    return tournament_controller.update(db, tournament_id, data)


@router.delete("/{tournament_id}")
def delete(tournament_id: int, db: Session = Depends(get_db)):
    return tournament_controller.delete(db, tournament_id)