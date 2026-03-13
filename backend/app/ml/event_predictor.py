from app.ml.model_loader import get_model


def predict_event(features):

    model = get_model()

    prediction = model.predict(features)

    return prediction[0]