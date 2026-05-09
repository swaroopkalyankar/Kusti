from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.auth import Authentication
from app.utils.hashing import hash_password
from app.services.auth_service import login


def signup_user(db: Session, username: str, password: str):
    
    # Check duplicate user
    existing_user = db.query(Authentication).filter(
        Authentication.username == username
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # Hash password
    hashed_password = hash_password(password)

    # Save user
    new_user = Authentication(
        username=username,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


def login_user(db: Session, username: str, password: str):
    token = login(db, username, password)

    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "access_token": token,
        "token_type": "bearer"
    }