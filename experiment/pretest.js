
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

const myQuestions = [
  {
    question: "California Bearing Ratio (CBR) test is a penetration test meant for the evaluation of",
    answers: {
      a: "Base strength of roads and pavements",
      b: "Subgrade strength of roads and pavements",
      c: "Both A and B",
      d: "None of these"
    },
    correctAnswer: "b"
  },

  {
    question: "Harder the surface",
    answers: {
      a: "Higher the CBR value",
      b: "Lower the CBR value",
      c: "CBR Value not effected",
      d: "No relation"
    },
    correctAnswer: "a"
  },
  {
    question: "Results from CBR tests are used with the empirical curves to determine",
    answers: {
      a: "Thickness of pavement and its component layers",
      b: "Roughness of pavement and its component layers",
      c: "Durability of pavement and its component layers",
      d: "None of the above"
    },
    correctAnswer: "b"
  },
  {
    question: "The CBR test can be conducted for",
    answers: {
      a: "Sub-grade soil",
      b: "Granular sub-base material",
      c: "Both A and B",
      d: "None of the above"
    },
    correctAnswer: "c"
  },
  {
    question: "California Bearing Ratio (CBR) is a",
    answers: {
      a: "measure of soil strength",
      b: "method of soil identification",
      c: "measure to indicate the relative strengths of paving materials",
      d: "measure of shear strength under lateral confinement"
    },
    correctAnswer: "c"
  }
];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
