const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": " 80 students know English, 60 know French, 50 know German, 30 known Enlgish and French, 20 know French and German, 15 know English and German and 10 students know all the three languages.How many students know at least one language ",
    "choice1": "2",
    "choice2": "8",
    "choice3": "3",
    "choice4": "16",
    "answer": 2
  },
  {
    "question": " How do you write 'Hello World' in an alert box?",
    "choice1": "msgBox('Hello World');",
    "choice2": "alertBox('Hello World');",
    "choice3": "msg('Hello World');",
    "choice4": "alert('Hello World');",
    "answer": 4
  },
  {
    "question": " The number of elements in the Power set P(S) of the set S = [ [ Φ] , 1, [ 2, 3 ]] is",
    "choice1": "2",
    "choice2": "8",
    "choice3": "3",
    "choice4": "16",
    "answer": 2
  },

];

console.log(questions.length)
var MAX_QUESTIONS;

var QUIZ_TIME = 27000;




fetch('questions.json')
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    MAX_QUESTIONS = loadedQuestions.length
    console.log(loadedQuestions);
    // questions=loadedQuestions;
    startGame();
  })
  .catch(err => {
    console.error(err);
  });

//CONSTANTS
const CORRECT_BONUS = 1;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
  var time = 25;
  setInterval(function(){
    document.getElementById('timer').innerHTML = time


    if(time > 0){}
      time--
      if (time < 10) {
        document.getElementById('timer').style.color = "red";
      }
    
  }, 1000)
  
};

setInterval( getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;

 
}, QUIZ_TIME)

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    getNewQuestion();
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
    }, 500);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
