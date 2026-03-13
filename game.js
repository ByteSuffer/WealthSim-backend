// ============================================================
//  game.js  —  Financial State Machine
//  Your teammates will fill this in. This is a mock version
//  so you can build the UI without waiting for them.
// ============================================================

let state = {};

const DECISIONS = {
  student: [
    {
      id: "student_1",
      title: "Take a student loan?",
      description: "A ₹5L loan covers full tuition. Or work part-time — harder, but debt-free.",
      choices: [
        { id: "take_loan",    label: "Take ₹5L loan",        type: "bad",  effect: { debt: 500000, happiness: 10 } },
        { id: "work_parttime",label: "Work part-time",        type: "good", effect: { salary: 8000,  happiness: -10 } },
        { id: "scholarship",  label: "Apply for scholarship", type: "",     effect: { happiness: 5 } }
      ]
    },
    {
      id: "student_2",
      title: "Unexpected ₹20,000 savings. What now?",
      description: "You saved up from odd jobs. Spend it, save it, or invest?",
      choices: [
        { id: "spend",   label: "Treat yourself",    type: "bad",  effect: { happiness: 20, netWorth: -20000 } },
        { id: "save_fd", label: "Fixed Deposit",      type: "good", effect: { netWorth: 20000 } },
        { id: "invest",  label: "Buy index fund SIP", type: "good", effect: { netWorth: 20000, creditScore: 10 } }
      ]
    }
  ],
  job: [
    {
      id: "job_1",
      title: "First salary: ₹45,000/mo",
      description: "Rent is expensive in the city. Move in alone or with roommates?",
      choices: [
        { id: "alone",     label: "Live alone (₹20K rent)", type: "bad",  effect: { netWorth: -20000, happiness: 15 } },
        { id: "roommates", label: "Roommates (₹8K rent)",   type: "good", effect: { netWorth: -8000,  happiness: 5  } }
      ]
    },
    {
      id: "job_2",
      title: "Stock market is booming. Invest?",
      description: "Your colleague doubled his money. Risk ₹1L in stocks or stay safe?",
      choices: [
        { id: "invest_stocks", label: "Invest ₹1L in stocks", type: "",     effect: { netWorth: -100000, creditScore: 5  } },
        { id: "mutual_fund",   label: "SIP in mutual funds",  type: "good", effect: { netWorth: -20000,  creditScore: 10 } },
        { id: "ignore",        label: "Stay in savings",      type: "",     effect: { happiness: -5 } }
      ]
    }
  ],
  family: [
    {
      id: "family_1",
      title: "Buy a house or keep renting?",
      description: "Home loan EMI = ₹35K/mo. Rent = ₹18K/mo. Which builds your future?",
      choices: [
        { id: "buy_house",  label: "Buy house (EMI ₹35K)",  type: "",     effect: { debt: 5000000, netWorth: 5000000, happiness: 20 } },
        { id: "keep_rent",  label: "Keep renting & invest", type: "good", effect: { netWorth: 200000 } }
      ]
    }
  ],
  retirement: [
    {
      id: "retirement_1",
      title: "When to retire?",
      description: "Retire now with ₹80L corpus, or work 5 more years for ₹1.5Cr?",
      choices: [
        { id: "retire_now",  label: "Retire now",           type: "",     effect: { happiness: 30 } },
        { id: "work_more",   label: "Work 5 more years",    type: "good", effect: { netWorth: 700000, happiness: -10 } }
      ]
    }
  ]
};

const EVENTS = [
  { id: "market_crash",   icon: "📉", title: "Market Crash!",       description: "Markets fell 35%. Your investments lost value.",          impactText: "Net Worth -₹80,000",  effect: { netWorth: -80000, happiness: -20 }, type: "bad"  },
  { id: "promotion",      icon: "🚀", title: "Promotion!",           description: "Your hard work paid off. Salary increased by 20%!",       impactText: "Salary +20%",         effect: { salary: 0.2,     happiness: 25  }, type: "good" },
  { id: "medical",        icon: "🏥", title: "Medical Emergency",    description: "Unexpected surgery. Health insurance covers 60%.",         impactText: "Expenses -₹1,20,000", effect: { netWorth: -120000, happiness: -15 }, type: "bad"  },
  { id: "bonus",          icon: "💰", title: "Year-End Bonus!",      description: "Company had a great year. You get a ₹50,000 bonus.",      impactText: "Net Worth +₹50,000",  effect: { netWorth: 50000, happiness: 15  }, type: "good" },
  { id: "inflation",      icon: "📈", title: "Inflation Spike!",     description: "Prices up 8%. Your monthly expenses increased.",           impactText: "Monthly costs +₹5,000",effect: { netWorth: -60000, happiness: -10 }, type: "bad"  },
  { id: "side_hustle",    icon: "💡", title: "Side Project Takes Off","description":"Your weekend project got traction. Extra ₹20K/month!",  impactText: "Income +₹20,000/mo",  effect: { netWorth: 240000, happiness: 20 }, type: "good" }
];

const STAGE_ORDER = ["student", "job", "family", "retirement"];

function initGame(name, goal) {
  state = {
    name, goal,
    stage: "student",
    age: 18,
    netWorth: 0,
    debt: 0,
    salary: 0,
    creditScore: 650,
    happiness: 70,
    badges: [],
    decisionIndex: 0,
    turn: 0,
    eventLog: []
  };
}

function getState() { return { ...state }; }

function getCurrentDecision() {
  const stageDecs = DECISIONS[state.stage] || [];
  return stageDecs[state.decisionIndex] || null;
}

function applyChoice(choiceId) {
  const dec = getCurrentDecision();
  if (!dec) return;
  const choice = dec.choices.find(c => c.id === choiceId);
  if (!choice) return;

  const e = choice.effect;
  if (e.netWorth)    state.netWorth    += e.netWorth;
  if (e.debt)        state.debt        += e.debt;
  if (e.happiness)   state.happiness    = Math.min(100, Math.max(0, state.happiness + e.happiness));
  if (e.creditScore) state.creditScore  = Math.min(850, state.creditScore + e.creditScore);
  if (e.salary)      state.salary      += e.salary;

  state.age += 2;
  state.decisionIndex++;
  state.turn++;

  _checkBadges();

  const stageDecs = DECISIONS[state.stage] || [];
  if (state.decisionIndex >= stageDecs.length) {
    _advanceStage();
  }
}

function checkForEvent() {
  if (Math.random() > 0.45) return null;
  const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  const e = event.effect;
  if (e.netWorth) state.netWorth    += e.netWorth;
  if (e.salary)   state.salary      *= (1 + e.salary);
  if (e.happiness)state.happiness    = Math.min(100, Math.max(0, state.happiness + e.happiness));
  state.eventLog.push(event.id);
  return event;
}

function getScore() {
  return Math.round(
    (state.netWorth / 1000) * 0.5 +
    state.creditScore * 0.3 +
    state.happiness * 10 +
    state.badges.length * 500 -
    (state.debt / 1000) * 0.2
  );
}

function isGameOver() {
  return state.stage === "done";
}

function _advanceStage() {
  const idx = STAGE_ORDER.indexOf(state.stage);
  if (idx < STAGE_ORDER.length - 1) {
    state.stage = STAGE_ORDER[idx + 1];
    state.decisionIndex = 0;
  } else {
    state.stage = "done";
  }
}

function _checkBadges() {
  if (state.netWorth > 1000000 && !state.badges.includes("Crorepati Club"))
    state.badges.push("Crorepati Club");
  if (state.creditScore >= 750 && !state.badges.includes("Credit Champion"))
    state.badges.push("Credit Champion");
  if (state.debt === 0 && state.turn > 2 && !state.badges.includes("Debt Free"))
    state.badges.push("Debt Free");
  if (state.happiness >= 90 && !state.badges.includes("Happy Investor"))
    state.badges.push("Happy Investor");
}
