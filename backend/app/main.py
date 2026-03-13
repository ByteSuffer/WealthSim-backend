from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_game import router as game_router
from app.ml.model_loader import load_model

# Create FastAPI app FIRST
app = FastAPI(title="Financial Life Simulator Backend")

# Add CORS middleware AFTER app is created
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model when server starts
@app.on_event("startup")
def startup():
    load_model()

# Register API routes
app.include_router(game_router)