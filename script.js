const scoreNumber = document.querySelector('.score__number');

const paperBtn = document.querySelectorAll('.paper-btn');
const scissorsBtn = document.querySelectorAll('.scissors-btn');
const rockBtn = document.querySelectorAll('.rock-btn');
const lizardBtn = document.querySelector('.lizard');
const spockBtn = document.querySelector('.spock');

const triangle = document.querySelector('.triangle');
const pentagon = document.querySelector('.pentagon');

const levelEasy = document.querySelector('.level-easy');
const levelHard = document.querySelector('.level-hard');
const game = document.querySelector('.game__results');

const player = document.querySelector('.player');
const house = document.querySelector('.house');

const gameResult = document.querySelector('.result__container');

const playBtn = document.querySelector('.play-btn');

const rulesBtn = document.querySelector('.rules-btn');
const displayules = document.querySelector('.rules');
const closeBtn = document.querySelector('.close');

const toggleSwitch = document.getElementById('toggleSwitch');
const switchContainer = document.querySelector('.game-header__switcher');

let randomValue = "";
let currentScore = 0;
let score = 0;

let isChecked = false;

console.log(isChecked);

document.addEventListener("DOMContentLoaded", () => {
    isChecked = JSON.parse(localStorage.getItem('isChecked')) || false;
    score = parseInt(localStorage.getItem('score')) || 0;
    scoreNumber.textContent = score;
    toggleSwitch.checked = isChecked;

    if (isChecked) {
        levelEasy.classList.add('hide');
        levelHard.classList.remove('hide');
        pentagon.classList.remove('hide');
    } else {
        levelEasy.classList.remove('hide');
        levelHard.classList.add('hide');
        triangle.classList.remove('hide');
    }
});

const housePicker = () => {
    buttonPattern(house, "default");
    
    let choices  = ["rock", "paper", "scissors", "lizard", "spock"];
    let random;

    !isChecked ? random = Math.floor(Math.random() * 3) : random = Math.floor(Math.random() * 5);

    randomValue = choices[random];
    
    setTimeout(() => {
        buttonPattern(house, randomValue);
        displayScore();
    }, 1000);
    
    setTimeout(() => {
        gameResult .classList.remove('hide');
    }, 3000);
};

const buttonPattern = (output, value) => {
    if (value === "default") {
        output.innerHTML = `<div class="default"></div>`;
    } else {
        output.innerHTML = `
            <div class="${value} picked-${value} picked-btn btn">
                <button type="button" class="${value}-btn">
                    <img src="images/icon-${value}.svg" alt="${value}">
                </button>
            </div>
        `;
    }   
};

displayShadows = () => {
    player.classList.remove('add-shadows');
    house.classList.remove('add-shadows');

   if (currentScore > score) {
        setTimeout(() => {
            house.classList.add('add-shadows');
        }, 2000);
    } else if (currentScore < score) {
        setTimeout(() => {
            player.classList.add('add-shadows');
        }, 2000);
    } else {
        player.classList.remove('add-shadows');
        house.classList.remove('add-shadows');
    }
};

displayScore = () => {
    score <= 0 ? score = 0  : score;
    scoreNumber.textContent = score;
    localStorage.setItem('score', score);
};

// removeAndAddClasses = () => {
//     currentScore = score;
//     levelEasy.classList.add('hide');
//     levelHard.classList.add('hide');
//     triangle.classList.add('hide');
//     pentagon.classList.add('hide');
//     game.classList.remove('hide');
//     switchContainer.classList.add('hide');
// };

displayResult = (lose1, lose2, win1, win2) => {
    let resulttext = document.querySelector('.result-text'); 

    if (randomValue === lose1 || randomValue === lose2) {
        resulttext.textContent = "You Lose";
        score--;
    }else if (randomValue === win1 || randomValue === win2) {
        resulttext.textContent = "You Win";
        score++;
    } else {
         resulttext.textContent = "Draw";
    }
}

//Event Listeners
toggleSwitch.addEventListener('change', function() {
    let confirm = window.confirm("If you confirm, your result will in score of 0");

    if (confirm) {
        score = 0;
        scoreNumber.textContent = 0;
        localStorage.setItem('score', score);

        if (this.checked) {
            levelEasy.classList.add('hide');
            levelHard.classList.remove('hide');
            pentagon.classList.remove('hide');
            isChecked = true;
        } else {
            levelEasy.classList.remove('hide');
            levelHard.classList.add('hide');
            triangle.classList.remove('hide');
            isChecked = false;
        }
        localStorage.setItem('isChecked', isChecked);
    } else {
        this.checked = !this.checked;
    }
});

eventListenerTool = (playerChosen, lose1, lose2, win1, win2) => {
    currentScore = score;
    levelEasy.classList.add('hide');
    levelHard.classList.add('hide');
    triangle.classList.add('hide');
    pentagon.classList.add('hide');
    game.classList.remove('hide');
    switchContainer.classList.add('hide');
    buttonPattern(player, playerChosen);
    housePicker();
    displayResult(lose1, lose2, win1, win2);
    displayShadows();
};

paperBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        eventListenerTool('paper', 'scissors', 'lizard', 'rock', 'spock')
    });
});

scissorsBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        eventListenerTool('scissors', 'rock', 'paper', 'lizard');
    });
});

rockBtn.forEach(btn => {
    btn.addEventListener('click', () => { 
        eventListenerTool('rock', 'paper', 'spock', 'scissors', 'lizard');
    });
});

lizardBtn.addEventListener('click', () => {
    eventListenerTool('lizard', 'scissors', 'rock', 'paper', 'spock');
});

spockBtn.addEventListener('click', () => { 
    eventListenerTool('spock', 'lizard', 'paper', 'scissors', 'rock');
});

playBtn.addEventListener("click", () => {

    if (isChecked === false) {
        levelEasy.classList.remove('hide');
        triangle.classList.remove('hide');
    } else {
        levelHard.classList.remove('hide');
        pentagon.classList.remove('hide');
    }
    
    game.classList.add('hide');
    gameResult.classList.add('hide');
    switchContainer.classList.remove('hide');
});

rulesBtn.addEventListener("click", () => {
    const rulesImg = document.querySelector('.rules-img');
    displayules.classList.remove('hide');

    if (isChecked === false) {
        rulesImg.innerHTML = `<img src="images/image-rules.svg" alt="rules">`;
    }else {
        rulesImg.innerHTML = `<img src="images/image-rules-bonus.svg" alt="rules">`;
    }
});

closeBtn.addEventListener("click", () => {
    displayules.classList.add('hide');
});
