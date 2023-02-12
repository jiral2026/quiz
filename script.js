//these consts are used to asign ids to the text i put in html, always make sure to define and put the consts so that theres no error fr
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const choiceButtonsElement = document.getElementById('choice-buttons')


//just so you know, all the questions are gonna be shuffled everytime you retake the quiz but the answers always stay the same naman
//kayo na bahala sa counter pls

//used "let" instead of const so they can be redefined later 
let mixedQuestions, currentQuestionIndex


startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startQuiz() {
    startButton.classList.add('hide')
    
    //this part is for shuffling the questions, basically using a rng to choose which questions to display
    mixedQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion () {
    resetState()
    showQuestion(mixedQuestions[currentQuestionIndex])
}

//this function is esentially just going to take the questions from the "const questions" part and insert it into the html, so innertext is where youre inserting it and the "question.question" portion is what you are inserting
function showQuestion(question) {
    questionElement.innerText = question.question
    
    //looping so the code applies to all questions
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        
        //to check if the answer is correct obviously !!, data set adds a data attribute to the button
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectChoice)
        choiceButtonsElement.appendChild(button)
    })
}


//reset state is used to reset everything into its default state aka its just to eliminate the errors
function resetState () {
    nextButton.classList.add('hide')
    
    //looping, because if theres a child in the elements, we want to remove it
    while (choiceButtonsElement.firstChild) {
        choiceButtonsElement.removeChild(choiceButtonsElement.firstChild)
    }
}

// for selecting your answer, and this is activated when you actually click your answer
function selectChoice (e) {
    
    //e.target is just whatever you clicked on 
    const selectedButton = e.target
    
    //to check if its correct
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    
    //looping and converting into an array
    Array.from(choiceButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (mixedQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove ('hide')
    }
    else {
        startButton.innerText = 'Retake the Quiz?'
        startButton.classList.remove ('hide')
    }
}

//also for checking if its correct, so that the buttons change color if the answer is right or wrong
function setStatusClass (element, correct) {
    clearStatusClass (element)
    if (correct) {
        element.classList.add ('correct')
    }
    else {
        element.classList.add ('wrong')
    }
}

function clearStatusClass (element) {
    element.classList.remove ('correct')
    element.classList.remove ('wrong')
}

//list of questions for the quiz + all the answers are in an array
const questions = [
    {
    question: '2-2',
    answers: [
        {text: '0', correct: true},
        {text: '-1', correct: false},
        {text: '1', correct: false},
        {text: '2', correct: false} 
    ]
},

{
    question: '6 x 3',
    answers: [
        {text: '9', correct: false},
        {text: '3', correct: false},
        {text: '18', correct: true},
        {text: '6', correct: false} 
    ]
},

{
    question: 'more questions pls',
    answers: [
        {text: '1', correct: false},
        {text: '2', correct: true},
        {text: '3', correct: false},
        {text: '4', correct: false} 
    ]
},

{
    question: 'isa pa',
    answers: [
        {text: '1', correct: false},
        {text: '2', correct: true},
        {text: '3', correct: false},
        {text: '4', correct: false} 
    ]
},

{
    question: 'last question (so that its out of 5 :])',
    answers: [
        {text: '1', correct: false},
        {text: '2', correct: false},
        {text: '3', correct: false},
        {text: '2', correct: true}
    ]
},

]

//you can always copy paste the questions above and just switch up the choices if you wanna add more questions, you can also make it so that there's two correct answers to the statement
