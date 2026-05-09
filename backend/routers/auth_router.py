from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.auth import AuthSchema
from app.controllers import auth_controller

router = APIRouter(prefix="/auth", tags=["Auth"])



@router.post("/signup")
def signup(data: AuthSchema, db: Session = Depends(get_db)):
    return auth_controller.signup_user(db, data.username, data.password)



@router.post("/login")
def login(data: AuthSchema, db: Session = Depends(get_db)):
    return auth_controller.login_user(db, data.username, data.password)