const $rspCom = document.querySelector('#rspCom');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const $comTotal = document.querySelector('#comTotal');
const $myTotal = document.querySelector('#myTotal');
const $explain = document.querySelector('#explain');
const $gameBtnGroup = document.querySelector('.gameBtnGroup');
const $reStart = document.querySelector('#reStart');

const IMG_URL = 'rsp.png';

const rspX = {
    scissors: '0',//가위
    rock: '-220px',
    paper: '-435px',
};

let computerChoice = 'scissors';

const changeComputerHand = () => {
    if (computerChoice === 'scissors') {
        computerChoice = 'rock';
    } else if (computerChoice === 'rock'){
        computerChoice = 'paper';
    } else {
        computerChoice = 'scissors';
    }
    $rspCom.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0 no-repeat`;
    $rspCom.style.backgroundSize = 'auto 200px';
}

let intervalId = setInterval(changeComputerHand,70);

const scoreTable = {
    rock : 0,
    scissors: 1,
    paper : -1,
};

let myTotal = 0;
let comTotal = 0;

let clickable = true;
const clickButton = () => {
    if (clickable) {
        clearInterval(intervalId);
        clickable = false;
        const myChoise = event.target.textContent === '바위'
            ? 'rock'
            : event.target.textContent === '가위'
                ? 'scissors' : 'paper';
        
        const myScore = scoreTable[myChoise];
        const computerScore = scoreTable[computerChoice];
        const result = myScore - computerScore;

        // 2,-1 승리 , -2,1은 패배
        if ([2,-1].includes(result)) {
            myTotal += 1;
            $myTotal.textContent = `${myTotal}`;
        } else if (result === -2 || result === 1) {
            comTotal += 1;
            $comTotal.textContent = `${comTotal}`;
        }

        if(myTotal === 2) {
            $explain.textContent = '승리!';
            $explain.style.color = 'blue';
            gameEnd();
        } else if (comTotal === 2) {
            $explain.textContent = '패배';
            $explain.style.color = 'red';
            gameEnd();
        } else {
            setTimeout(() => {
                clickable = true;
                clearInterval(intervalId);
                intervalId = setInterval(changeComputerHand,70);
            }, 1000);
        }

    }
}; 


const gameEnd = () => {
    $gameBtnGroup.remove();
    $reStart.style.display = 'inline';
}

$reStart.addEventListener('click', ()=> {
    location.reload(true);
})


$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);