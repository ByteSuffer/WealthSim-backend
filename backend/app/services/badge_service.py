def check_badges(state):

    if state.net_worth > 100000 and "Millionaire" not in state.badges:
        state.badges.append("Millionaire")

    if state.debt <= 0 and "Debt Free" not in state.badges:
        state.badges.append("Debt Free")

    return state