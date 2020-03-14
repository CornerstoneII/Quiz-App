const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  },
  {
    question: " How do you comment in HTML5?",
    choice1: "//",
    choice2: "#",
    choice3: "<!---->",
    choice4: "/'''/",
    answer: 3
  },
  {
    question: " How do you make a picture into a background image of a web page?",
    choice1: "<body background = “image.gif”>",
    choice2: "<body bgd = “image.gif”>",
    choice3: "<body background = “image”>",
    choice4: "<background = “image.gif”>",
    answer: 1
  },
  {
    question: " What are two types of Web Storage in HTML5?",
    choice1: "External Storage & Inbuilt Storage",
    choice2: "Session Storage & Local Storage",
    choice3: "None of these",
    choice4: "A & B",
    answer: 2
  },
  {
    question: "HTML stands for?",
    choice1: "Hyper Markup Language",
    choice2: "HyperText Media Language",
    choice3: "HyperText Markup Language",
    choice4: "HyperText Method Language",
    answer: 3
  },
  {
    question: "Hyperlink tag can be applied to?",
    choice1: "Text",
    choice2: "image",
    choice3: "video",
    choice4: "All",
    answer: 4
  },
  {
    question: "Default size for a text field is around ___________ characters?",
    choice1: "14",
    choice2: "12",
    choice3: "20",
    choice4: "All",
    answer: 3
  },
  {
    question: "What is an iframe?",
    choice1: "Is used to create ajax frame",
    choice2: "Helps include one webpage into another",
    choice3: "Divides the page into 2 sections",
    choice4: "All",
    answer: 2
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

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

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
