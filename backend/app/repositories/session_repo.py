sessions = {}

def save_session(session_id, state):
    sessions[session_id] = state

def get_session(session_id):
    return sessions.get(session_id)