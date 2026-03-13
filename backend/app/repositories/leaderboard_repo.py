leaderboard = []

def add_score(name, score):

    leaderboard.append({
        "name": name,
        "score": score
    })

    leaderboard.sort(key=lambda x: x["score"], reverse=True)

    return leaderboard[:10]