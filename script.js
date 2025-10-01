let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.getElementById("status");
function startGame() {
    if (!started) {
      started = true;
      levelUp();
      document.getElementById("start-btn").style.display = "none"; // hide button
    }
  }
  
  document.getElementById("start-btn").addEventListener("click", startGame);
  
let currentLevelEl = document.getElementById("current-level");
let highScoreEl = document.getElementById("high-score");

// Load saved high score
let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.textContent = highScore;

let btns = ["green", "yellow", "red", "blue"];

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 300);
}

function levelUp() {
  userSeq = [];
  level++;
  currentLevelEl.textContent = level;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * btns.length);
  let randomColor = btns[randomIdx];
  let randombtn = document.getElementById(randomColor);

  gameSeq.push(randomColor);
  console.log("Game sequence:", gameSeq);

  setTimeout(() => btnFlash(randombtn), 500);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Score: <b>${level - 1}</b> <br> Press any key to Restart`;

    if (level - 1 > highScore) {
      highScore = level - 1;
      localStorage.setItem("highScore", highScore);
      highScoreEl.textContent = highScore;
    }

    document.body.style.backgroundColor = "red";
    setTimeout(() => (document.body.style.backgroundColor = ""), 250);

    reset();
  }
}

function btnpress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnpress));

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
  currentLevelEl.textContent = 0;
}
