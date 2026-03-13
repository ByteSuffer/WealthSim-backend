def calculate_score(state):

    score = (
        state.net_worth * 0.5
        + state.credit_score * 2
        + state.happiness * 1.5
        - state.debt * 0.3
    )

    return score