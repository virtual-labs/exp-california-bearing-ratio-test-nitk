
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
      question: "Load is applied on the sample by a standard plunger of diameter?",
      answers: {
        a: "30mm",
        b: "25mm",
        c: "75mm",
        d: "50mm"
      },
      correctAnswer: "d"
    },

    {
      question: "CBR apparatus consists of a mould of __ diameter with a base plate and a collar",
      answers: {
        a: "125mm",
        b: "100mm",
        c: "130mm",
        d: "150mm"
      },
      correctAnswer: "d"
    },

    {
      question: "In CBR test load is applied such that penetration rate is _ per minute",
      answers: {
        a: "1.00mm",
        b: "1.25mm",
        c: "5.00mm",
        d: "7.50mm"
      },
      correctAnswer: "d"
    },
    {
      question: "CBR value",
      answers: {
        a: "Decreases as the penetration increases",
        b: "Increases as the penetration increases",
        c: "Increases as the penetration remains constant",
        d: "Decreases as the penetration remains constant"
      },
      correctAnswer: "c"
    },
    {
      question: "In CBR test, CBR value is measured at",
      answers: {
        a: "2.5mm",
        b: "5mm",
        c: "Both 2.5mm and 5mm",
        d: "None of the above"
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
