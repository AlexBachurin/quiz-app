//get elems
const startBtn = document.querySelector('.start__btn'),
    info = document.querySelector('.info-container'),
    quitBtn = document.querySelector('.info__btn-quit'),
    restartBtn = document.querySelector('.info__btn-start'),
    resultBox = document.querySelector('.result-container');

//show rules, start
startBtn.addEventListener('click', () => {
    info.classList.add('active-info')
})

//exit quiz
quitBtn.addEventListener('click', () => {
    info.classList.remove('active-info')
})

const quizBox = document.querySelector('.quiz-container');

//process to quiz
restartBtn.addEventListener('click', () => {
    info.classList.remove('active-info');
    quizBox.classList.add('active-info')
    showCardInfo(0)
})

//counter to count questions to not exceed length
let questionCounter = 0;

//function to show card info, getting data from array from questions.js
function showCardInfo(index) {
    //get single question info from questions by index
    const item = questions[index];
    const question = item.question;
    const options = item.options;
    const answer = item.answer;
    //show question
    const questionDOM = document.querySelector('.quiz__question')
    const queText = `${question}`
    questionDOM.textContent = queText;

    //show options
    const optionsDOM = document.querySelector('.quiz__options')
    let optionsList = '';
    optionsList = options.map(option => {
        if (option === answer) {
            return `<div class="quiz__option">
            <span>${option}</span>
            <div class="quiz__icon quiz__icon_tick"><i class="fas fa-check"></i></div>
        </div>`
        } else {
            return `<div class="quiz__option">
        <span>${option}</span>
        </div>`
        }
    }).join('')
    optionsDOM.innerHTML = optionsList;

    //setup footer numbers
    const currentOption = document.querySelector('.quiz__num-current');
    const totalNumOption = document.querySelector('.quiz__num-total');
    currentOption.textContent = questionCounter + 1;
    totalNumOption.textContent = questions.length;

    //setup clicking on option choice
    const optionChoice = document.querySelectorAll('.quiz__option');
    optionChoice.forEach(option => {
        option.addEventListener('click', (e) => {
            const target = e.target;
            //get clicked element text content
            const text = target.textContent;
            console.log(text);
        })
    })
}

//next btn
const nextBtn = document.querySelector('.quiz__btn-next');

nextBtn.addEventListener('click', () => {
    //check counter
    questionCounter++;
    //if we still have questions keep asking them
    if (questionCounter < questions.length) {
        console.log(questionCounter)
        showCardInfo(questionCounter);
    //else show result window
    } else if (questionCounter === questions.length) {
        resultBox.classList.add('active-info');
        quizBox.classList.remove('active-info');
    }
})