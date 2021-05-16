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

    //setup footer numbers and disable next button
    const currentOption = document.querySelector('.quiz__num-current');
    const totalNumOption = document.querySelector('.quiz__num-total');
    const nextBtn = document.querySelector('.quiz__btn-next');
    currentOption.textContent = questionCounter + 1;
    totalNumOption.textContent = questions.length;
    nextBtn.disabled = true;

    //setup clicking on option choice
    const optionChoice = [...document.querySelectorAll('.quiz__option')];
    const optionTitle = [...document.querySelectorAll('.quiz__option span')];
    const icons = document.querySelectorAll('.quiz__icon');
    const wrongIcon = `<div class=" quiz__icon quiz__icon_cross"><i class="fas fa-times"></i></div>`
    
    
    optionChoice.forEach(option => {
        option.addEventListener('click', (e) => {
            const target = e.target;
            //get clicked element text content
            const text = target.textContent;
            //find correct option
            const correctOption = optionChoice.filter(item => {
                const child = item.firstElementChild;
                if (child.textContent === answer) {
                    return item;
                }
            })

            console.log(correctOption);
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
            //activate next button
            nextBtn.disabled = false;
            //disable clicking on options
            optionChoice.forEach(option => {
                option.classList.add('answered')
            })

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