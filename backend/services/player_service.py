from sqlalchemy.orm import Session
from models.player import Player


def get_all_players(db: Session):
    return db.query(Player).all()


def create_player(db: Session, data):
    player = Player(
        name=data.name,
        age=data.age,
        weight=data.weight,
        category=data.category,
        state=data.state
    )

    db.add(player)
    db.commit()
    db.refresh(player)

    return player


def get_player_by_id(db: Session, player_id: int):
    return db.query(Player).filter(Player.id == player_id).first()


def update_player(db: Session, player_id: int, data):
    player = get_player_by_id(db, player_id)

    if player:
        player.name = data.name
        player.age = data.age
        player.weight = data.weight
        player.category = data.category
        player.state = data.state

        db.commit()
        db.refresh(player)

    return player


def delete_player(db: Session, player_id: int):
    player = get_player_by_id(db, player_id)

    if player:
        db.delete(player)
        db.commit()

    return player