const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const choiceButtonsElement = document.getElementById('choice-buttons')


//just so you know, all the questions are gonna be shuffled everytime you retake the quiz but the answers always stay the same naman
//kayo na bahala sa counter pls

let mixedQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startQuiz() {
    startButton.classList.add('hide')
    mixedQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion () {
    resetState()
    showQuestion(mixedQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectChoice)
        choiceButtonsElement.appendChild(button)
    })
}

function resetState () {
    nextButton.classList.add('hide')
    while (choiceButtonsElement.firstChild) {
        choiceButtonsElement.removeChild(choiceButtonsElement.firstChild)
    }
}

function selectChoice (e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
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
