from app.ml.event_predictor import predict_event
from app.ml.feature_builder import build_features


def generate_event(state):

    features = build_features(state)

    event = predict_event(features)

    return event