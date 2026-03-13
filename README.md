# WealthSim — Financial Life Simulator

## File Structure
```
wealthsim/
├── index.html   ← Open this in browser to run the game
├── style.css    ← All visual styling
├── app.js       ← YOUR FILE — screen logic & rendering
└── game.js      ← Game state machine (teammates fill this in)
```

## How to Run (VS Code)

1. Install VS Code: https://code.visualstudio.com
2. Install extension: "Live Server" by Ritwick Dey
3. Open the `wealthsim/` folder in VS Code
4. Right-click `index.html` → "Open with Live Server"
5. Browser opens automatically at localhost:5500

## Team Handoff

Tell your teammates game.js needs to export these functions:
- `initGame(name, goal)` — initialize player state
- `getState()` — return current state object
- `getCurrentDecision()` — return current decision object
- `applyChoice(choiceId)` — apply a player choice
- `checkForEvent()` — fire random event or return null
- `getScore()` — return final numeric score
- `isGameOver()` — return true when game is complete

The mock version in game.js already works so you can build without waiting for them.
