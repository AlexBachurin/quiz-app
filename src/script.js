//get elems
const startBtn = document.querySelector('.start__btn'),
    info = document.querySelector('.info-container'),
    quitBtn = document.querySelectorAll('.btn_quit'),
    restartBtn = document.querySelector('.info__btn-start'),
    resultBox = document.querySelector('.result-container'),
    nextBtn = document.querySelector('.quiz__btn-next'),
    quizBox = document.querySelector('.quiz-container');
    header = document.querySelector('.quiz-container header')

//show rules, start
startBtn.addEventListener('click', () => {
    info.classList.add('active-info')
})





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
let quizTimerId;
//timer border setinterval id
let timerLineId;
//timer line initial value
let timerLineValue = 0;
//container width to check line speed
let timerLineWidth = quizBox.getBoundingClientRect().width;
console.log(timerLineWidth)

//function to show card info, getting data from array from questions.js
function showCardInfo(index) {
    //start timer
    setupTimer(timerSec);
    //start timer line
    startTimerLine(timerLineValue, timerLineWidth)
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
    
    const wrongIcon = `<div class=" quiz__icon quiz__icon_cross"><i class="fas fa-times"></i></div>`
    
    
    optionChoice.forEach(option => {
        option.addEventListener('click', (e) => {
            const target = e.currentTarget;
            //get clicked element text content
            // const text = target.textContent;
            //get correct answer
            const correctOption = findCorrectOptionElement();
            if (target.textContent === answer || target.firstElementChild.textContent === answer) {
                //increase correct answer value and show green tick to user
                correctAns++;
                option.classList.add('correct')
                //display icons
                showIcons()
            } else {
                //else append cross icon to clicked element and show right answer
                // and decorate wrong answer
                option.innerHTML += wrongIcon;
                option.classList.add('wrong');
                //display icons
                showIcons();
                //show correct option
                correctOption.classList.add('correct');
            }
            //enable next button
            enableBtn();
            //disable clicking on options
            disableOptions(optionChoice)
            //clear quiz timer
            clearInterval(quizTimerId)
            //clear timer line timer
            clearInterval(timerLineId)

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

// show footer info(number of question and all questions count)
function quizFooterInfo() {
    const currentOption = document.querySelector('.quiz__num-current');
    const totalNumOption = document.querySelector('.quiz__num-total');
    currentOption.textContent = questionCounter + 1;
    totalNumOption.textContent = questions.length;
}
// show result(how many correct answers)
function showScore() {
    const userScore = document.querySelector('.result__score-correct');
    const totalScore = document.querySelector('.result__score-total');
    //show user score, correct answers stored in correctAns variable
    userScore.textContent = correctAns;
    //total score is our array with questions length
    totalScore.textContent = questions.length;
    //show message
    showScoreMessage();
}

//shhow score message
function showScoreMessage() {
    const messageDOM = document.querySelector('.result__score-message');
    let message = ''
    //check correct answers
    if (correctAns === 5) {
        message = 'Perfect!'
    } else if (correctAns >= 2) {
        message = 'not bad!'
    } else  {
        message = 'You can do better!'
    }
    messageDOM.textContent = message;
}

// **** HELPING FUNCTIONALITY ****
//find correct option
function findCorrectOptionElement() {
    // const correctOption = optionsArr.filter(item => {
    //     const child = item.firstElementChild;
    //     if (child.textContent === correctAns) {
    //         return item;
    //     }
    // })
    const correctOption = document.querySelector('.quiz__icon_tick').parentElement;

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
//disable clicking on option choice
function disableOptions(optionChoiceArr) {
    //disable clicking on options
    optionChoiceArr.forEach(option => {
        option.classList.add('answered')
    })
}
//show icons
function showIcons() {
    const icons = document.querySelectorAll('.quiz__icon');
    icons.forEach(icon => {
        icon.classList.add('display-icon')
    })
}


// **** TIMER ****

//get time diff
function getTimeDiff(deadline) {
    const timeNow = Date.parse(new Date());
    const timeDiff = (deadline - timeNow)/1000 ;
    return timeDiff
}

function setupTimer(sec) {
    //get timer from page
    const timerDOM = document.querySelector('.quiz__timer-sec');
    //get deadline
    const deadline = Date.parse(new Date()) + sec*1000;
    //remove delay on showing timer
    updateTimer();
    function updateTimer() {
        const timeDiff = getTimeDiff(deadline)
        timerDOM.textContent = timeDiff;
        if (timeDiff <= 0) {
            clearInterval(quizTimerId)
            //enable next button
            enableBtn();
            //disable clicking on options
            const optionChoice = [...document.querySelectorAll('.quiz__option')];
            disableOptions(optionChoice)
            //show icons
            showIcons()
            //get correct answer and show it
            correctOption = findCorrectOptionElement();
            correctOption.classList.add('correct');
        }
    }

    quizTimerId = setInterval(updateTimer, 1000)
}


// **** NEXT BUTTON FUNCTIONALITY ****


nextBtn.addEventListener('click', () => {
    //check counter
    questionCounter++;
    //if we still have questions keep asking them
    if (questionCounter < questions.length) {
        showCardInfo(questionCounter);
    //else show result window
    } else if (questionCounter === questions.length) {
        resultBox.classList.add('active-info');
        quizBox.classList.remove('active-info');
        //show user score
        showScore()
        //reset correct answers
        correctAns = 0;
        //reset question counter
        questionCounter = 0;
        //reset timer
        clearInterval(quizTimerId);
        //reset timer line
        clearInterval(timerLineId)
        
    }
})

// **** QUIT QUIZ  ****
//exit quiz
quitBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.reload();
    })
})

// **** REPLAY QUIZ ****
const replayBtn = document.querySelector('.result__btn-replay');

replayBtn.addEventListener('click', () => {
    resultBox.classList.remove('active-info')
    info.classList.add('active-info')
})

// **** COLOR TIMER BORDER ****
const timerLine = document.querySelector('.quiz__timer-line')
function startTimerLine(time, width){
    //depending on element width we wanna change setInterval speed
    let speed = 0;
    if (width >= 540) {
        speed = 28
    } else {
        speed = 44
    }

    timerLineId = setInterval(timer, speed);
    console.log(width)
    function timer(){
        time++; //upgrading time value with 1
        timerLine.style.width = time + "px"; //increasing width of timerline with px by time value
        if(time > width){ //if time value is greater than 540
            clearInterval(timerLineId); //clear timerLine
        }
    }
}

