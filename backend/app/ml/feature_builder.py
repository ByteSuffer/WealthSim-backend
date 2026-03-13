import numpy as np

STAGE_MAP = {
    "student": 0,
    "job": 1,
    "family": 2,
    "retirement": 3
}


def build_features(state):

    debt_ratio = state.debt / (state.net_worth + 1)

    return np.array([[
        STAGE_MAP[state.stage],
        state.net_worth,
        debt_ratio,
        state.credit_score
    ]])