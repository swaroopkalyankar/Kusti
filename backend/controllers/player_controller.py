from sqlalchemy.orm import Session
from fastapi import HTTPException
from models.player import Player

from services import player_service
from schemas.player import PlayerCreate


def get_all_players(db: Session):
    return player_service.get_all_players(db)


def create_player(db: Session, data: PlayerCreate):
    player = Player(**data.dict())

    db.add(player)
    db.commit()
    db.refresh(player)

    return player

def get_player_by_id(db: Session, player_id: int):
    player = player_service.get_player_by_id(db, player_id)

    if not player:
        raise HTTPException(
            status_code=404,
            detail="Player not found"
        )

    return player

from schemas.player import PlayerUpdate


def update_player(db: Session, player_id: int, data: PlayerUpdate):
    player = db.query(Player).filter(Player.id == player_id).first()

    if not player:
        return {"error": "Player not found"}

    update_data = data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(player, key, value)

    db.commit()
    db.refresh(player)

    return player


def delete_player(db: Session, player_id: int):
    player = db.query(Player).filter(Player.id == player_id).first()

    if not player:
        return {"error": "Player not found"}

    db.delete(player)
    db.commit()

    return {"message": "Player deleted successfully"}