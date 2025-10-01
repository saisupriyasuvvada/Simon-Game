// ------------------ Variables ------------------
let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

// Get high score from localStorage or 0
let highScore = localStorage.getItem("simonHighScore") || 0;

// DOM Elements
let h2 = document.getElementById("status");
let currentLevelDisplay = document.getElementById("current-level");
let highScoreDisplay = document.getElementById("high-score");
let startBtn = document.getElementById("start-btn"); // optional start button for mobile
let restartBtn = document.getElementById("restart-btn");

// Update initial displays
currentLevelDisplay.innerText = level;
highScoreDisplay.innerText = highScore;

let btns = ["green", "yellow", "red", "blue"];

// ------------------ Functions ------------------

// Flash button animation
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

// User flash on click
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

// Play sound for new color only
function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

// ------------------ Game Logic ------------------

// Level up - add new color
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    currentLevelDisplay.innerText = level;

    // Random new color
    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`#${randomColor}`);

    gameSeq.push(randomColor);

    btnFlash(randombtn);
    playSound(randomColor); // sound only for new color
}

// Check user answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b>`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);

        // Update high score
        if (level > highScore) {
            highScore = level;
            localStorage.setItem("simonHighScore", highScore);
            highScoreDisplay.innerText = highScore;
        }

        restartBtn.style.display = "inline-block"; // show restart button
        reset();
    }
}

// Button click handler
function btnpress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Reset game
function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
    currentLevelDisplay.innerText = level;
}

// ------------------ Event Listeners ------------------

// Add click listeners to all buttons
let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}

// Optional Start button for mobile
if (startBtn) {
    startBtn.addEventListener("click", function () {
        this.style.display = "none";
        started = true;
        levelUp();
    });
}

// Restart button
restartBtn.addEventListener("click", function () {
    this.style.display = "none";
    started = true;
    levelUp();
});

// Start game on keyboard press (desktop)
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});
