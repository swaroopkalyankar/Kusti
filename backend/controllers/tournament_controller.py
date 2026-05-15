from models.tournament import Tournament


def get_all(db):
    return db.query(Tournament).all()


def create(db, data):
    tournament = Tournament(
        name=data.name,
        organizer=data.organizer,
        venue=data.venue,
        city=data.city,
        state=data.state,
        start_date=data.start_date,
        end_date=data.end_date,
    )

    db.add(tournament)
    db.commit()
    db.refresh(tournament)

    return tournament


def update(db, tournament_id, data):
    tournament = (
        db.query(Tournament)
        .filter(Tournament.id == tournament_id)
        .first()
    )

    if not tournament:
        return {"error": "Tournament not found"}

    if data.name is not None:
        tournament.name = data.name

    if data.organizer is not None:
        tournament.organizer = data.organizer

    if data.venue is not None:
        tournament.venue = data.venue

    if data.city is not None:
        tournament.city = data.city

    if data.state is not None:
        tournament.state = data.state

    if data.start_date is not None:
        tournament.start_date = data.start_date

    if data.end_date is not None:
        tournament.end_date = data.end_date

    db.commit()
    db.refresh(tournament)

    return tournament


def delete(db, tournament_id):
    tournament = (
        db.query(Tournament)
        .filter(Tournament.id == tournament_id)
        .first()
    )

    if not tournament:
        return {"error": "Tournament not found"}

    db.delete(tournament)
    db.commit()

    return {"message": "Tournament deleted"}