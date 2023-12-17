try {
  // Define the Quiz class
  class Quiz {
    constructor() {
      // DOM Element Selection
      this.startBtn = document.querySelector(".start-btn");
      this.popupInfo = document.querySelector(".popup-info");
      this.exitBtn = document.querySelector(".exit-btn");
      this.main = document.querySelector(".main");
      this.continueBtn = document.querySelector(".continue-btn");
      this.quizSection = document.querySelector(".quiz-section");
      this.quizBox = document.querySelector(".quiz-box");
      this.resultBox = document.querySelector(".result-box");
      this.tryAgainBtn = document.querySelector(".tryAgain-btn");
      this.goHomeBtn = document.querySelector(".goHome-btn");
      this.nextBtn = document.querySelector(".next-btn");
      this.optionList = document.querySelector(".option-list");
      this.timerDisplay = document.querySelector(".timer");
      this.time = document.querySelector(".time"); // Added to display remaining time

      // Global Variables for tracking the state
      this.questionCount = 0;
      this.questionNumb = 1;
      this.userScore = 0;
      this.timer = 5 * 60; // 5 minutes in seconds

      // Bind event handlers to the class instance
      this.startBtn.onclick = this.startQuiz.bind(this);
      this.exitBtn.onclick = this.exitQuiz.bind(this);
      this.continueBtn.onclick = this.continueQuiz.bind(this);
      this.tryAgainBtn.onclick = this.tryAgain.bind(this);
      this.goHomeBtn.onclick = this.goHome.bind(this);
      this.nextBtn.onclick = this.nextQuestion.bind(this);

      // Load questions on page load
      document.addEventListener("DOMContentLoaded", () => {
        this.questions = [
          {
            numb: 1,
            question: "Which planet is known as the 'Red Planet'?",
            answer: "B. Mars",
            options: ["A. Venus", "B. Mars", "C. Jupiter", "D. Saturn"],
          },
          {
            numb: 2,
            question: "Who wrote the play 'Romeo and Juliet'?",
            answer: "B. William Shakespeare", // Correct Answer
            options: [
              "A. Charles Dickens",
              "B. William Shakespeare",
              "C. Jane Austen",
              "D. Mark Twain",
            ],
          },
          {
            numb: 3,
            question: "What is the capital city of France?",
            answer: "C. Paris", // Correct Answer
            options: ["A. Berlin", "B. Rome", "C. Paris", "D. Madrid"],
          },
          {
            numb: 4,
            question: "What does CSS stand for?",
            answer: "A. Cascading Style Sheet",
            options: [
              "A. Cascading Style Sheet",
              "B. Cute Style Sheet",
              "C. Computer Style Sheet",
              "D. Continued Style Sheet",
            ],
          },
          {
            numb: 5,
            question: "Which element has the chemical symbol 'H'?",
            answer: "A. Hydrogen",
            options: ["A. Hydrogen", "B. Helium", "C. Carbon", "D. Oxygen"],
          },
          {
            numb: 6,
            question: "In which year did the Titanic sink?",
            answer: "A. 1912",
            options: ["A. 1912", "B. 1920", "C. 1905", "D. 1911"],
          },
          {
            numb: 7,
            question: "Who painted the Mona Lisa?",
            answer: "B. Leonardo da Vinci", // Correct Answer
            options: [
              "A. Pablo Picasso",
              "B. Leonardo da Vinci",
              "C. Vincent van Gogh",
              "D. Claude Monet",
            ],
          },
          {
            numb: 8,
            question:
              "Which famous scientist developed the theory of relativity?",
            answer: "B. Albert Einstein",
            options: [
              "A. Isaac Newton",
              "B. Albert Einstein",
              "C.  Galileo Galilei",
              "D. Marie Curie",
            ],
          },
          {
            numb: 9,
            question: "Which ocean is the largest on Earth?",
            answer: "D. Pacific Ocean", // Correct Answer
            options: [
              "A. Indian Ocean",
              "B. Atlantic Ocean",
              "C. Southern Ocean",
              "D. Pacific Ocean",
            ],
          },
          {
            numb: 10,
            question: "What is the currency of Japan?",
            answer: "B. Yen",
            options: ["A. Gen", "B. Yen", "C. Ringgit", "D. Baht"],
          },
        ];

        this.showQuestions();
        this.questionCounter();
      });
    }

    // Timer function
    startTimer() {
      let intervalId = setInterval(() => {
        let minutes = Math.floor(this.timer / 60);
        let seconds = this.timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.time.textContent = `${minutes}:${seconds}`;

        if (this.timer <= 0) {
          clearInterval(intervalId);
          // Timer has ended, show result box
          this.showResultBox();
        }

        this.timer--;
      }, 1000);
    }

    // Function to handle user option selection
    optionSelected = (answer) => {
      let userAnswer = answer.textContent;
      let correctAnswer = this.questions[this.questionCount].answer;
      let allOptions = this.optionList.children;

      if (userAnswer == correctAnswer) {
        // If user's answer is correct
        answer.classList.add("correct");
        this.userScore += 1;
        this.headerScore();
      } else {
        // If user's answer is incorrect, automatically highlight the correct answer
        answer.classList.add("incorrect");

        for (let i = 0; i < allOptions.length; i++) {
          if (allOptions[i].textContent === correctAnswer) {
            allOptions[i].classList.add("correct");
          }
        }
      }

      // Disable all options after selection
      for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add("disabled");
      }

      // Show the Next button to proceed to the next question
      this.nextBtn.classList.add("active");
    };

    // Function to display questions and options
    showQuestions() {
      const questionText = document.querySelector(".question-text");
      questionText.textContent = `${this.questions[this.questionCount].numb}. ${
        this.questions[this.questionCount].question
      }`;

      let optionTag = "";
      for (
        let i = 0;
        i < this.questions[this.questionCount].options.length;
        i++
      ) {
        optionTag += `<div class="option"><span>${
          this.questions[this.questionCount].options[i]
        }</span></div>`;
      }

      this.optionList.innerHTML = optionTag;

      const option = document.querySelectorAll(".option");
      for (let i = 0; i < option.length; i++) {
        option[i].addEventListener("click", () =>
          this.optionSelected(option[i])
        );
      }
    }

    // Function to update the question counter
    questionCounter() {
      const questionTotal = document.querySelector(".question-total");
      questionTotal.textContent = `${this.questionNumb} of ${this.questions.length} Questions`;
    }

    // Function to update the header score display
    headerScore() {
      const headerScoreText = document.querySelector(".header-score");
      headerScoreText.textContent = `Score: ${this.userScore} / ${this.questions.length}`;
    }

    // Function to display the result box
    showResultBox() {
      this.quizBox.classList.remove("active");
      this.resultBox.classList.add("active");

      const scoreText = document.querySelector(".score-text");
      scoreText.textContent = `You Scored: ${this.userScore} out of ${this.questions.length}`;

      const circularProgress = document.querySelector(".circular-progress");
      const progressValue = document.querySelector(".progress-value");
      let progressStartValue = 0;
      let progressEndValue = (this.userScore / this.questions.length) * 100;
      let speed = 20;

      let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${
          progressStartValue * 3.6
        }deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue >= progressEndValue) {
          clearInterval(progress);
        }
      }, speed);

      // Alert if the user scored less than 5/10
      if (this.userScore < 5) {
        alert("You scored less than 5 out of 10. Please redo the quiz.");
      }
    }

    // Start Button Click Event
    startQuiz() {
      this.popupInfo.classList.add("active");
      this.main.classList.add("active");
      this.startTimer();
    }

    // Exit Button Click Event
    exitQuiz() {
      this.popupInfo.classList.remove("active");
      this.main.classList.remove("active");
    }

    // Continue Button Click Event
    continueQuiz() {
      this.quizSection.classList.add("active");
      this.popupInfo.classList.remove("active");
      this.main.classList.remove("active");
      this.quizBox.classList.add("active");

      this.showQuestions();
      this.questionCounter();
      this.headerScore();
    }

    // Try Again Button Click Event
    tryAgain() {
      this.quizBox.classList.add("active");
      this.resultBox.classList.remove("active");

      this.questionCount = 0;
      this.questionNumb = 1;
      this.userScore = 0;
      this.timer = 5 * 60; // Reset the timer

      this.showQuestions();
      this.questionCounter();
      this.headerScore();
    }

    // Go Home Button Click Event
    goHome() {
      this.quizSection.classList.remove("active");
      this.resultBox.classList.remove("active");

      this.questionCount = 0;
      this.questionNumb = 1;
      this.userScore = 0;
      this.timer = 5 * 60; // Reset the timer

      this.showQuestions();
      this.questionCounter();
    }

    // Next Button Click Event
    nextQuestion() {
      if (this.questionCount < this.questions.length - 1) {
        this.questionCount++;
        this.showQuestions();

        this.questionNumb++;
        this.questionCounter();

        this.nextBtn.classList.remove("active");
      } else {
        this.showResultBox();
      }
    }
  }

  // Create an instance of the Quiz class
  const quiz = new Quiz();
} catch (error) {
  // Handle any errors that occur within the try block
  console.error("An error occurred:", error);
}
