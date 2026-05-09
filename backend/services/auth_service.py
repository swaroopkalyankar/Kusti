from sqlalchemy.orm import Session
from app.models.auth import Authentication
from app.utils.hashing import verify_password
from app.utils.jwt_handler import create_token

def login(db: Session, username: str, password: str):
    user = db.query(Authentication).filter(Authentication.username == username).first()

    if not user or not verify_password(password, user.password):
        return None

    token = create_token({"sub": user.username})
    return token