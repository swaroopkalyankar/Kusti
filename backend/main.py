import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

from routers import player_router, auth_router
from routers.tournament_router import router as tournament_router
from routers.official_router import router as official_router
from routers.match_router import router as match_router
app = FastAPI(redirect_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create tables
Base.metadata.create_all(bind=engine)

# routers
app.include_router(auth_router.router)
app.include_router(player_router.router)
app.include_router(tournament_router)
app.include_router(official_router)
app.include_router(match_router)