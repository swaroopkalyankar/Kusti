from fastapi import FastAPI
from app.database import Base, engine
from app.routers import employee_router, auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router.router)
app.include_router(employee_router.router)