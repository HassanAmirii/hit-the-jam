// 1. GAME DATA & CONFIG
const GameData = {
  BREAD: { emoji: "🍞", words: ["BREAD", "BRED", "BRAID", "BRAD", "BEARD"] },
  JAM: { emoji: "🍓", words: ["JAM", "JAMB", "GEM", "HAM", "JAMME"] },
  COMBO: { emoji: "🥪", words: ["BREADJAM"] },
};

const Config = {
  startSpeed: 2000,
  minSpeed: 700,
  decrement: 40,
  hitXP: 10,
  comboXP: 50,
};

// 2. STATE VARIABLES
let score = 0;
let speed = Config.startSpeed;
let activeTarget = "";
let gameTimer = null;
let isGameOver = false;

// 3. DOM ELEMENTS
const elements = {
  xp: document.getElementById("xp-display"),
  hi: document.getElementById("high-score"),
  target: document.getElementById("target-display"),
  targetText: document.getElementById("target-text"),
  grid: document.getElementById("button-grid"),
  overlay: document.getElementById("game-over-overlay"),
  finalXp: document.getElementById("final-xp"),
  failMessage: document.getElementById("fail-message"), // New element
};

// 4. CORE ENGINE
function init() {
  const savedHi = localStorage.getItem("breadJam_hiScore") || 0;
  elements.hi.textContent = savedHi;

  score = 0;
  speed = Config.startSpeed;
  isGameOver = false;
  elements.overlay.style.display = "none";
  elements.xp.textContent = "0";

  nextTurn();
}

function nextTurn() {
  if (isGameOver) return;

  const keys = ["BREAD", "JAM", "BREAD", "JAM", "COMBO"];
  activeTarget = keys[Math.floor(Math.random() * keys.length)];

  elements.target.textContent = GameData[activeTarget].emoji;
  elements.targetText.textContent = `TARGET: ${activeTarget}`;

  renderButtons();

  clearTimeout(gameTimer);
  // Pass "slow" as the reason if timer expires
  gameTimer = setTimeout(() => triggerGameOver("slow"), speed);
}

function renderButtons() {
  elements.grid.innerHTML = "";

  const correctWord = GameData[activeTarget].words[0];
  let pool = [{ text: correctWord, correct: true }];

  const allWords = [...GameData.BREAD.words, ...GameData.JAM.words];
  while (pool.length < 4) {
    const rand = allWords[Math.floor(Math.random() * allWords.length)];
    if (!pool.find((p) => p.text === rand)) {
      pool.push({ text: rand, correct: false });
    }
  }

  pool.sort(() => Math.random() - 0.5);

  pool.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "game-btn";
    btn.textContent = item.text;
    btn.onclick = () => handleInput(item.correct, item.text === "BREADJAM");
    elements.grid.appendChild(btn);
  });
}

function handleInput(isCorrect, isCombo) {
  if (isGameOver) return;

  if (isCorrect) {
    score += isCombo ? Config.comboXP : Config.hitXP;
    speed = Math.max(Config.minSpeed, speed - Config.decrement);
    elements.xp.textContent = score;

    const currentHi = parseInt(elements.hi.textContent);
    if (score > currentHi) {
      localStorage.setItem("breadJam_hiScore", score);
      elements.hi.textContent = score;
    }

    nextTurn();
  } else {
    // Pass "blind" as the reason for an incorrect click
    triggerGameOver("blind");
  }
}

function triggerGameOver(reason) {
  isGameOver = true;
  clearTimeout(gameTimer);

  // Conditional Insult Logic
  if (reason === "slow") {
    elements.failMessage.textContent = "WHAT A SLOW RETARD";
  } else if (reason === "blind") {
    elements.failMessage.textContent = "WHAT A BLIND RETARD";
  } else {
    elements.failMessage.textContent = "SYSTEM FAILURE";
  }

  elements.finalXp.textContent = score;
  elements.overlay.style.display = "flex";

  document.body.style.backgroundColor = "#400";
  setTimeout(() => (document.body.style.backgroundColor = "#0a0a0c"), 200);
}

init();
