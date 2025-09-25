// Quiz Questions
const quizData = [
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Tool Multi Language", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "Which company developed Java?",
    options: ["Microsoft", "Apple", "Sun Microsystems", "Google"],
    answer: "Sun Microsystems"
  }
];

// Variables
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

// DOM Elements
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const progress = document.getElementById("progress");
const timerDisplay = document.getElementById("timer");

// Load Question
function loadQuestion() {
  clearInterval(timer);
  timeLeft = 30;
  timerDisplay.textContent = `⏱ ${timeLeft}s`;
  startTimer();

  let question = quizData[currentQuestion];
  questionText.textContent = question.question;
  progress.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

  optionsContainer.innerHTML = "";
  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("list-group-item", "list-group-item-action");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(btn, question.answer);
    optionsContainer.appendChild(btn);
  });
}

// Check Answer
function checkAnswer(selectedBtn, correctAnswer) {
  clearInterval(timer);
  let options = optionsContainer.querySelectorAll(".list-group-item");
  options.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("wrong");
    }
  });

  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }
}

// Next Question
nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

// Show Result
function showResult() {
  questionText.textContent = "";
  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";
  result.classList.remove("d-none");
  scoreDisplay.textContent = `${score} / ${quizData.length}`;
  clearInterval(timer);
}

// Restart Quiz
if (restartBtn) {
  restartBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "block";
    result.classList.add("d-none");
    loadQuestion();
  };
}

// Timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `⏱ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.click();
    }
  }, 1000);
}

// Start Quiz
loadQuestion();
