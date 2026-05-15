from sqlalchemy.orm import Session

from models.match import Match


def create_match(data, db: Session):
    new_match = Match(
        wrestlerA=data.wrestlerA,
        wrestlerB=data.wrestlerB,
        official=data.official,
        tournamentId=data.tournamentId,
        venue=data.venue,
        matchDateTime=data.matchDateTime,
        status=data.status,
    )

    db.add(new_match)
    db.commit()
    db.refresh(new_match)

    return new_match


def get_all_matches(db: Session):
    return db.query(Match).all()


def update_match(match_id: int, data, db: Session):
    match = db.query(Match).filter(Match.id == match_id).first()

    if not match:
        return {"error": "Match not found"}

    match.wrestlerA = data.wrestlerA
    match.wrestlerB = data.wrestlerB
    match.official = data.official
    match.tournamentId = data.tournamentId
    match.venue = data.venue
    match.matchDateTime = data.matchDateTime
    match.status = data.status

    db.commit()
    db.refresh(match)

    return match


def delete_match(match_id: int, db: Session):
    match = db.query(Match).filter(Match.id == match_id).first()

    if not match:
        return {"error": "Match not found"}

    db.delete(match)
    db.commit()

    return {"message": "Match deleted successfully"}