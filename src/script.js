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
//counter for correct answers
let correctAns = 0;
//timer time in seconds
let timerSec = 15;
//quiz timer setinterval id
let quizTimer;

//function to show card info, getting data from array from questions.js
function showCardInfo(index) {
    //start timer
    setupTimer(timerSec);
    //get single question info from questions by index
    const item = questions[index];
    const question = item.question;
    const options = item.options;
    const answer = item.answer;
    //show question
    showQuestion(question);

    //show options
    showOptionsList(answer, options)

    //setup footer numbers and disable next button
    quizFooterInfo();
    //disable btn
    disableBtn();

    //setup clicking on option choice
    const optionChoice = [...document.querySelectorAll('.quiz__option')];
    const icons = document.querySelectorAll('.quiz__icon');
    const wrongIcon = `<div class=" quiz__icon quiz__icon_cross"><i class="fas fa-times"></i></div>`
    
    
    optionChoice.forEach(option => {
        option.addEventListener('click', (e) => {
            const target = e.target;
            //get clicked element text content
            const text = target.textContent;
            //get correct answer
            const correctOption = findCorrectAnswer(optionChoice, answer);

            if (text === answer) {
                //increase correct answer value and show green tick to user
                correctAns++;
                option.classList.add('correct')
                icons.forEach(icon => {
                    icon.classList.add('display-icon')
                })
            } else {
                //else append cross icon to clicked element and show right answer
                // and decorate wrong answer
                option.innerHTML += wrongIcon;
                option.classList.add('wrong');
                //display icons
                icons.forEach(icon => {
                    icon.classList.add('display-icon')
                })
                //show correct option
                correctOption[0].classList.add('correct');
            }
            //enable next button
            enableBtn();
            //disable clicking on options
            optionChoice.forEach(option => {
                option.classList.add('answered')
            })
            //clear quiz timer
            clearInterval(quizTimer)

        })
        
        
    })
}

// **** SHOW QUIZ CARD INFO ****
//show quiz question
function showQuestion(question) {
    const questionDOM = document.querySelector('.quiz__question')
    const queText = `${question}`
    questionDOM.textContent = queText;
}

//show options list
function showOptionsList(answer, options) {
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
}

function quizFooterInfo() {
    const currentOption = document.querySelector('.quiz__num-current');
    const totalNumOption = document.querySelector('.quiz__num-total');
    currentOption.textContent = questionCounter + 1;
    totalNumOption.textContent = questions.length;
}

// **** HELPING FUNCTIONALITY ****
//find correct option
function findCorrectAnswer(optionsArr, correctAns) {
    const correctOption = optionsArr.filter(item => {
        const child = item.firstElementChild;
        if (child.textContent === correctAns) {
            return item;
        }
    })

    return correctOption;
}

//disable button 
function disableBtn() {
    nextBtn.classList.add('btn-disabled');
    nextBtn.disabled = true;
}
//enable button
function enableBtn() {
    nextBtn.classList.remove('btn-disabled');
    nextBtn.disabled = false;
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

// **** TIMER ****

//get time diff
function getTimeDiff(deadline) {
    const timeNow = Date.parse(new Date());
    const timeDiff = (deadline - timeNow)/1000 ;
    console.log(timeDiff)
    return timeDiff
}

function setupTimer(sec) {
    //get timer from page
    const timerDOM = document.querySelector('.quiz__timer-sec');
    //get deadline
    const deadline = Date.parse(new Date()) + sec*1000;
    console.log(deadline)
    function updateTimer() {
        const timeDiff = getTimeDiff(deadline)
        timerDOM.textContent = timeDiff;
        if (timeDiff <= 0) {
            clearInterval(quizTimer)
        }
    }

    quizTimer = setInterval(updateTimer, 1000)
}