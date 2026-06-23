from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base
from app.database import engine

from app.models.user import User
from app.models.property import Property

from app.routes.properties import router as property_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CampusNest API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:3000',
        "http://127.0.0.1:3000",],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],)


from app.routes.auth import router as auth_router

app.include_router(auth_router)
app.include_router(property_router)


@app.get("/")
def root():
    return {
        "message": "CampusNest API Running"
    }