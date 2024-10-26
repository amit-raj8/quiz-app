const questions = [
    {
        question: "which is largest animal in the world",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Gorrila", correct: false},
        ]
    },
    {
        question: "which is the smallest content in the world",
        answers:[
            {text: "Asia", correct: false},
            {text: "Africa", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
        ]
       
    },
    {
        question: "how many district in bihar",
        answers:[
            {text: "38", correct: true},
            {text: "40", correct: false},
            {text: "29", correct: false},
            {text: "28", correct: false},

        ]
    },
    {
        question: "which is largest country in the world",
        answers:[
            {text: "India", correct: false},
            {text: "Russia", correct: true},
            {text: "Pakistan", correct: false},
            {text: "China", correct: false},
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = answer.text;
        button.addEventListener("click", () => selectAnswer(answer));
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer){
    const isCorrect = answer.correct;
    const selectedButton = Array.from(answerButtons.children).find(button => button.innerHTML === answer.text);
    if (isCorrect){
selectedButton.classList.add("correct");
score++;
    }else{
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

     function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
     }

    nextButton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
    })
startQuiz();