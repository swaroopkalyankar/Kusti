from sqlalchemy.orm import Session
from models.auth import Authentication
from utils.hashing import verify_password
from utils.jwt_handler import create_token

def login(db: Session, username: str, password: str):
    user = db.query(Authentication).filter(Authentication.username == username).first()

    if not user or not verify_password(password, user.password):
        return None

    token = create_token({"sub": user.username})
    return token