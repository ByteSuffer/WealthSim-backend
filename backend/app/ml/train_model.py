import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

X = []
y = []

events = ["promotion", "layoff", "market_crash", "medical_emergency", "nothing"]

for _ in range(500):

    stage = np.random.randint(0, 4)
    net_worth = np.random.randint(-50000, 200000)
    debt_ratio = np.random.random()
    credit_score = np.random.randint(500, 850)

    X.append([stage, net_worth, debt_ratio, credit_score])

    event = np.random.choice(events)

    y.append(event)

model = RandomForestClassifier()
model.fit(X, y)

# 👇 Build correct path to backend/models
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "event_model.pkl")

joblib.dump(model, MODEL_PATH)

print("Model saved at:", MODEL_PATH)