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
};

// 4. CORE ENGINE
function init() {
  // Load High Score from LocalStorage
  const savedHi = localStorage.getItem("breadJam_hiScore") || 0;
  elements.hi.textContent = savedHi;

  score = 0;
  speed = Config.startSpeed;
  isGameOver = false;

  nextTurn();
}

function nextTurn() {
  if (isGameOver) return;

  // Randomize target (BREAD, JAM, or rare COMBO)
  const keys = ["BREAD", "JAM", "BREAD", "JAM", "COMBO"];
  activeTarget = keys[Math.floor(Math.random() * keys.length)];

  // Update Visuals
  elements.target.textContent = GameData[activeTarget].emoji;
  elements.targetText.textContent = `TARGET: ${activeTarget}`;

  renderButtons();

  // Reset the "Game Over" countdown
  clearTimeout(gameTimer);
  gameTimer = setTimeout(triggerGameOver, speed);
}

function renderButtons() {
  elements.grid.innerHTML = "";

  // Get the correct word for the current target
  const correctWord = GameData[activeTarget].words[0];
  let pool = [{ text: correctWord, correct: true }];

  // Fill with 3 random decoys from the other sets
  const allWords = [...GameData.BREAD.words, ...GameData.JAM.words];
  while (pool.length < 4) {
    const rand = allWords[Math.floor(Math.random() * allWords.length)];
    if (!pool.find((p) => p.text === rand)) {
      pool.push({ text: rand, correct: false });
    }
  }

  // Shuffle buttons
  pool.sort(() => Math.random() - 0.5);

  // Create buttons
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
    // Successful Hit
    score += isCombo ? Config.comboXP : Config.hitXP;
    speed = Math.max(Config.minSpeed, speed - Config.decrement);

    // Update Stats
    elements.xp.textContent = score;

    // Check High Score
    const currentHi = parseInt(elements.hi.textContent);
    if (score > currentHi) {
      localStorage.setItem("breadJam_hiScore", score);
      elements.hi.textContent = score;
    }

    nextTurn();
  } else {
    // Wrong button hit
    triggerGameOver();
  }
}

function triggerGameOver() {
  isGameOver = true;
  clearTimeout(gameTimer);

  elements.finalXp.textContent = score;
  elements.overlay.style.display = "flex";

  // Visual shake/flash
  document.body.style.backgroundColor = "#400";
  setTimeout(() => (document.body.style.backgroundColor = "#0a0a0c"), 200);
}

// Start the game loop
init();
