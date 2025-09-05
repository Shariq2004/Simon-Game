let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0;  

let h2 = document.querySelector("h2");

// Create and insert a high score display element
let highScoreDisplay = document.createElement("h3");
highScoreDisplay.innerText = `Your Heighest Score: ${highScore}`;
document.body.insertBefore(highScoreDisplay, h2.nextSibling); // Show below h2

let startGameBtn  = document.querySelector('.start-game-btn');

startGameBtn.addEventListener("click", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); 
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        updateHighScore();  //  Update high score when game ends

        h2.innerHTML = `Game over! <b>Your score was ${level}</b>  Press start button to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "rgb(85, 243, 130)";
        }, 150);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

//  Update and display high score
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        highScoreDisplay.innerHTML = `<b> Your Heighest Score: ${highScore}</b>`;
    }
}