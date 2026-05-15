from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from controllers import player_controller
from schemas.player import PlayerCreate, PlayerUpdate


router = APIRouter(
    prefix="/players",
    tags=["Players"]
)


@router.get("/")
def get_all(
    db: Session = Depends(get_db),
    
):
    return player_controller.get_all_players(db)


@router.post("/")
def create(
    data: PlayerCreate,
    db: Session = Depends(get_db),
    
):
    return player_controller.create_player(db, data)


@router.get("/{player_id}")
def get_by_id(
    player_id: int,
    db: Session = Depends(get_db),
    
):
    return player_controller.get_player_by_id(db, player_id)


@router.put("/{player_id}")
def update(player_id: int, data: PlayerUpdate, db: Session = Depends(get_db)):
    return player_controller.update_player(db, player_id, data)


@router.delete("/{player_id}")
def delete(
    player_id: int,
    db: Session = Depends(get_db),
    
):
    return player_controller.delete_player(db, player_id)