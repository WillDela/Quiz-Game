// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress"); 


const quizQuestions = [
  {
    question: "What is my middle name?",
    answers: [
      { text: "William", correct: false },
      { text: "Chachito", correct: false },
      { text: "Kevin", correct: true },
      { text: "No middle name", correct: false },
    ],
  },
  {
    question: "What is my favorite type of run?",
    answers: [
      { text: "Workouts", correct: false },
      { text: "Long Runs", correct: true },
      { text: "Running Sucks", correct: false },
      { text: "Easy Runs", correct: false },
    ],
  },
  {
    question: "What type of dog do I want?",
    answers: [
      { text: "A Corgi", correct: true },
      { text: "A Dachshund", correct: false },
      { text: "A Australian Sheperd", correct: false },
      { text: "A Border Collie", correct: false },
    ],
  },
  {
    question: "What is my favorite food?",
    answers: [
      { text: "Italian Food", correct: false },
      { text: "Asian Food", correct: false },
      { text: "All Of It Bruh", correct: true },
      { text: "Mango Smoothies", correct: false },
    ],
  },
  {
    question: "What am I looking forward to?",
    answers: [
      { text: "Running More", correct: false },
      { text: "Making More Videos", correct: false },
      { text: "All Of Them, #Ambitious", correct: true },
      { text: "Programming More", correct: false },
    ],
  },
];

// Quiz State Variables

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners 

startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz() {
  // reset variables
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion()
}

function showQuestion() {
  // reset state
  answersDisabled = false

  const currentQuestion = quizQuestions[currentQuestionIndex]

  currentQuestionSpan.textContent = currentQuestionIndex + 1

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%"

  questionText.textContent = currentQuestion.question

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text; // <-- FIXED LINE
    button.classList.add("answer-btn")
    button.dataset.correct = answer.correct

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  })
}

function selectAnswer(event) {
  if(answersDisabled) return

  answersDisabled = true

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true"

  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if(isCorrect) {
    score++;
    scoreSpan.textContent = score
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if(currentQuestionIndex < quizQuestions.length) {
      showQuestion()
    } else {
      showResults()
    }
  },1000)

}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
