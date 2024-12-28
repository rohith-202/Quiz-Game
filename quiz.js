const questions = [
  {
    question: "Who was the top scorer of the tournament?",
    a: "Virat Kohli",
    b: "Rohit Sharma",
    c: "Rahmanullah Gurbaz",
    d: "Travis Head",
    answer: "c",
  },
  {
    question: "Who Won Player of the tournament?",
    a: "Jasprit Bumrah",
    b: "Rohit Sharma",
    c: "Hardik Pandya",
    d: "Arshdeep Singh",
    answer: "a",
  },
  {
    question: "Leading Wicket-taker of the tournament?",
    a: "Arshdeep Singh",
    b: "Fazalhaq Farooqi",
    c: "Jasprit Bumrah",
    d: "A Nortje",
    answer: "b",
  },
  {
    question: "Who Won Player of the Match in the Final?",
    a: "Virat Kohli",
    b: "Suryakumar Yadav",
    c: "Hardik Pandya",
    d: "Arshdeep Singh",
    answer: "a",
  },
  {
    question: "Which team scored the highest total in the tournament?",
    a: "India",
    b: "Australia",
    c: "South Africa",
    d: "West Indies",
    answer: "d",
  },
];

let questionIndex = 0;
let score = 0;
let userAnswers = [];

const quizElement = document.getElementById("question");
const resultElement = document.getElementById("result");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");

function loadQuiz() {
  const currentQuestion = questions[questionIndex];
  quizElement.innerHTML = `
          <h2>${currentQuestion.question}</h2>
          <ul class="options">
            <li onclick="selectAnswer('a')">
              <input type="radio" id="a" name="answer" value="a">
              <label for="a">${currentQuestion.a}</label>
            </li>
            <li onclick="selectAnswer('b')">
              <input type="radio" id="b" name="answer" value="b">
              <label for="b">${currentQuestion.b}</label>
            </li>
            <li onclick="selectAnswer('c')">
              <input type="radio" id="c" name="answer" value="c">
              <label for="c">${currentQuestion.c}</label>
            </li>
            <li onclick="selectAnswer('d')">
              <input type="radio" id="d" name="answer" value="d">
              <label for="d">${currentQuestion.d}</label>
            </li>
          </ul>
        `;

  const selectedAnswer = userAnswers[questionIndex];
  if (selectedAnswer) {
    document.querySelector(`#${selectedAnswer}`).checked = true;
    document
      .querySelector(`li[onclick="selectAnswer('${selectedAnswer}')"]`)
      .classList.add("selected");
  }

  if (questionIndex === questions.length - 1) {
    nextButton.innerText = "Submit";
  } else {
    nextButton.innerText = "Next";
  }

  prevButton.style.display = questionIndex === 0 ? "none" : "inline-block";
}

function selectAnswer(answer) {
  userAnswers[questionIndex] = answer;
  const options = document.querySelectorAll(".options li");
  options.forEach((li) => li.classList.remove("selected"));
  document
    .querySelector(`li[onclick="selectAnswer('${answer}')"]`)
    .classList.add("selected");
}

function next() {
  const selectedAnswer = userAnswers[questionIndex];

  if (selectedAnswer) {
    if (selectedAnswer === questions[questionIndex].answer) {
      score++;
    }

    questionIndex++;

    if (questionIndex < questions.length) {
      loadQuiz();
    } else {
      showResults();
    }
  } else {
    alert("Please select an answer!");
  }
}

function previous() {
  questionIndex--;
  loadQuiz();
}

function showResults() {
  quizElement.innerHTML = `
          <h2>You've answered ${score} out of ${questions.length} correctly!</h2>
          <div class="final-buttons">
           <button onclick="restartQuiz()">Try Again</button>
          </div>
        `;
  nextButton.style.display = "none";
  prevButton.style.display = "none";
}

function restartQuiz() {
  questionIndex = 0;
  score = 0;
  userAnswers = [];
  nextButton.style.display = "inline-block";
  prevButton.style.display = "inline-block";
  loadQuiz();
}

loadQuiz();
