from pydantic import BaseModel

class DecisionRequest(BaseModel):
    session_id: str
    decision: str