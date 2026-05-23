const playerDie = document.querySelector("#playerDie");
const cpuDie = document.querySelector("#cpuDie");
const playerScoreEl = document.querySelector("#playerScore");
const cpuScoreEl = document.querySelector("#cpuScore");
const roundNumberEl = document.querySelector("#roundNumber");
const resultBadge = document.querySelector("#resultBadge");
const message = document.querySelector("#message");
const rollButton = document.querySelector("#rollButton");
const resetButton = document.querySelector("#resetButton");

let playerScore = 0;
let cpuScore = 0;
let round = 1;
let gameOver = false;

function randomDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function setFace(die, value, owner) {
  const isRolling = die.classList.contains("rolling");
  die.className = `die face-${value}${isRolling ? " rolling" : ""}`;
  die.setAttribute("aria-label", `${owner}骰子點數 ${value}`);
}

function setScores() {
  playerScoreEl.textContent = playerScore;
  cpuScoreEl.textContent = cpuScore;
  roundNumberEl.textContent = round;
}

function finishGame(winner) {
  gameOver = true;
  rollButton.disabled = true;
  resultBadge.textContent = `${winner}獲勝`;
  message.textContent = winner === "玩家" ? "漂亮，這局是你拿下。" : "電腦先到 5 分，再來一局。";
}

function rollDice() {
  if (gameOver) return;

  rollButton.disabled = true;
  resultBadge.textContent = "擲骰中";
  message.textContent = "骰子正在桌上轉動...";
  playerDie.classList.add("rolling");
  cpuDie.classList.add("rolling");

  const shaker = window.setInterval(() => {
    setFace(playerDie, randomDie(), "玩家");
    setFace(cpuDie, randomDie(), "電腦");
  }, 70);

  window.setTimeout(() => {
    window.clearInterval(shaker);

    const playerRoll = randomDie();
    const cpuRoll = randomDie();
    setFace(playerDie, playerRoll, "玩家");
    setFace(cpuDie, cpuRoll, "電腦");
    playerDie.classList.remove("rolling");
    cpuDie.classList.remove("rolling");

    if (playerRoll > cpuRoll) {
      playerScore += 1;
      resultBadge.textContent = "玩家得分";
      message.textContent = `你擲出 ${playerRoll}，電腦擲出 ${cpuRoll}。`;
    } else if (cpuRoll > playerRoll) {
      cpuScore += 1;
      resultBadge.textContent = "電腦得分";
      message.textContent = `你擲出 ${playerRoll}，電腦擲出 ${cpuRoll}。`;
    } else {
      resultBadge.textContent = "平手";
      message.textContent = `雙方都是 ${playerRoll}，這回合不計分。`;
    }

    if (playerScore >= 5) {
      setScores();
      finishGame("玩家");
      return;
    }

    if (cpuScore >= 5) {
      setScores();
      finishGame("電腦");
      return;
    }

    round += 1;
    setScores();
    rollButton.disabled = false;
  }, 650);
}

function resetGame() {
  playerScore = 0;
  cpuScore = 0;
  round = 1;
  gameOver = false;
  setFace(playerDie, 1, "玩家");
  setFace(cpuDie, 1, "電腦");
  setScores();
  resultBadge.textContent = "先到 5 分獲勝";
  message.textContent = "按下擲骰，點數大的拿 1 分。";
  rollButton.disabled = false;
}

rollButton.addEventListener("click", rollDice);
resetButton.addEventListener("click", resetGame);
