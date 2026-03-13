from fastapi import APIRouter
from app.schemas.request_schemas import DecisionRequest
from app.repositories.session_repo import get_session, save_session
from app.services.game_engine import process_turn
from app.models.player_state import PlayerState

router = APIRouter()

@router.post("/start-game")
def start_game(session_id: str):

    state = PlayerState(
        stage="student",
        age=18,
        net_worth=0,
        debt=0,
        credit_score=650,
        happiness=70,
        salary=0,
        investments={},
        badges=[],
        decision_history=[]
    )

    save_session(session_id, state)

    return state


@router.post("/make-decision")
def make_decision(req: DecisionRequest):

    state = get_session(req.session_id)

    state, event, score = process_turn(state, req.decision)

    save_session(req.session_id, state)

    return {
        "event": event,
        "score": score,
        "state": state
    }