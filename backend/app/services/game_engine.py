from app.models.decision import DECISION_EFFECTS
from app.models.event import EVENT_EFFECTS
from app.services.event_engine import generate_event
from app.services.scoring_service import calculate_score


def apply_decision(state, decision):

    effect = DECISION_EFFECTS.get(decision, {})

    state.decision_history.append(decision)

    if "debt" in effect:
        state.debt += effect["debt"]

    if "net_worth" in effect:
        state.net_worth += effect["net_worth"]

    if "happiness" in effect:
        state.happiness += effect["happiness"]

    if "investments" in effect:
        for k, v in effect["investments"].items():
            state.investments[k] = state.investments.get(k, 0) + v

    return state


def apply_event(state, event):

    effect = EVENT_EFFECTS[event]

    if "salary" in effect:
        state.salary += effect["salary"]

    if "happiness" in effect:
        state.happiness += effect["happiness"]

    if "net_worth" in effect:
        state.net_worth += effect["net_worth"]

    if "investment_multiplier" in effect:
        for k in state.investments:
            state.investments[k] *= effect["investment_multiplier"]

    return state


def process_turn(state, decision):

    state = apply_decision(state, decision)

    event = generate_event(state)

    state = apply_event(state, event)

    score = calculate_score(state)

    return state, event, score