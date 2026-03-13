import joblib
from app.config import MODEL_PATH

model = None

def load_model():
    global model
    model = joblib.load(MODEL_PATH)

def get_model():
    return model