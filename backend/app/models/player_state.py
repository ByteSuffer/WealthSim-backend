from pydantic import BaseModel
from typing import Dict, List

class PlayerState(BaseModel):
    stage: str
    age: int
    net_worth: float
    debt: float
    credit_score: int
    happiness: int
    salary: float
    investments: Dict[str, float]
    badges: List[str]
    decision_history: List[str]