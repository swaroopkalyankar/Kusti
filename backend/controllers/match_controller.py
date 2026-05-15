from sqlalchemy.orm import Session

from services.match_service import (
    create_match,
    get_all_matches,
    update_match,
    delete_match,
)

def create_match_controller(data, db: Session):
    return create_match(data, db)

def get_matches_controller(db: Session):
    return get_all_matches(db)

def update_match_controller(match_id: int, data, db: Session):
    return update_match(match_id, data, db)

def delete_match_controller(match_id: int, db: Session):
    return delete_match(match_id, db)