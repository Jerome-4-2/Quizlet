const questions = [
    {
        question: "Largest continent on Earth is: ",
        answers: [
            { text: "Asia", correct: true },
            { text: "North America", correct: false },
            { text: "Antartica", correct: false },
            { text: "Africa", correct: false }
        ]
    },
    {
        question: "Father of Medicine: ",
        answers: [
            { text: "Valsyayanan", correct: false },
            { text: "Buddha", correct: false },
            { text: "Valmiki", correct: false },
            { text: "Charaka", correct: true }
        ]
    },
    {
        question: "Which is the largest land mammal?",
        answers: [
            { text: "Tiger", correct: false },
            { text: "Cow", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Elephant", correct: true }
        ]   
    }
    ,
    {
        question: "Which country has the most young population?",
        answers: [
            { text: "India", correct: true },
            { text: "China", correct: false },
            { text: "Japan", correct: false },
            { text: "America", correct: false }
        ]
    }
]

const questionElement = document.getElementById("Question");
const answerButton = document.getElementById("answer-buttons");
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
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }

}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        showScore();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `U scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again.";
    nextButton.style.display = "block"; 

}



startQuiz();









