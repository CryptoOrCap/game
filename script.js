let currentQuestion = 0;
let score = 0;
const totalRounds = 10;

const progressEl = document.getElementById("progress-bar");
const questionEl = document.getElementById("question");
const descriptionEl = document.getElementById("description");
const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");
const gameEl = document.getElementById("game");
const finalScoreEl = document.getElementById("final-score");
const cryptoImageEl = document.getElementById("crypto-image");
const feedbackEl = document.getElementById("feedback");

let projects = [];
let availableProjects = [];

// Fetch data from JSON
fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        projects = data;
        startGame();
    });

function startGame() {
    availableProjects = [...projects];
    shuffleArray(availableProjects);
    loadQuestion();
}

function loadQuestion() {
    const project = availableProjects.pop();
    currentQuestion++;
    questionEl.textContent = project.name;
    descriptionEl.textContent = project.description;
    descriptionEl.dataset.correct = project.type;
    cryptoImageEl.src = project.logo || "placeholder.jpg";
}

document.getElementById("crypto").addEventListener("click", () => checkAnswer("Real"));
document.getElementById("cap").addEventListener("click", () => checkAnswer("Fake"));

function checkAnswer(guess) {
    const correct = descriptionEl.dataset.correct;
    if (guess === correct) {
        score++;
        showFeedback("Correct!", "correct");
    } else {
        showFeedback("Wrong!", "wrong");
    }
    if (currentQuestion >= totalRounds) {
        endGame();
    } else {
        updateProgress();
        loadQuestion();
    }
    scoreEl.textContent = `Score: ${score}`;
}

function updateProgress() {
    progressEl.style.width = `${(currentQuestion / totalRounds) * 100}%`;
}

function showFeedback(message, type) {
    feedbackEl.textContent = message;
    feedbackEl.className = "";
    feedbackEl.classList.add(type);
    feedbackEl.style.opacity = "1";
    feedbackEl.style.transform = "scale(1.2)";
    setTimeout(() => {
        feedbackEl.style.opacity = "0";
        feedbackEl.style.transform = "scale(1)";
    }, 1000);
}

function endGame() {
    gameEl.classList.add("d-none");
    resultEl.classList.remove("d-none");
    finalScoreEl.textContent = `You scored ${score} out of ${totalRounds}!`;
}

function restartGame() {
    score = 0;
    currentQuestion = 0;
    scoreEl.textContent = `Score: ${score}`;
    progressEl.style.width = "0%";
    resultEl.classList.add("d-none");
    gameEl.classList.remove("d-none");
    startGame();
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}