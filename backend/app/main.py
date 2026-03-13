from fastapi import FastAPI
from app.api.routes_game import router as game_router
from app.ml.model_loader import load_model

app = FastAPI(title="Financial Life Simulator Backend")

@app.on_event("startup")
def startup():
    load_model()

app.include_router(game_router)