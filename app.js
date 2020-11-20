const toggleRules = () => {
    document.querySelector('.modal')
        .classList.toggle('modal-hidden');
}

document.querySelector('.rules')
    .addEventListener('click', toggleRules);

document.querySelector('.modal-close-bar span')
    .addEventListener('click', toggleRules);

let playerScore = document.querySelector('.player-score');
let computerScore = document.querySelector('.computer-score');
let message = document.querySelector('.message');
let buttons = document.querySelectorAll('main button');
let buttonPlayAgain = document.querySelector('.play-again');
let winnerScores

if (sessionStorage.getItem('playerScore') && sessionStorage.getItem('computerScore') && sessionStorage.getItem('message')) {
    playerScore.innerHTML = sessionStorage.getItem('playerScore');
    computerScore.innerHTML = sessionStorage.getItem('computerScore');
    message.innerHTML = sessionStorage.getItem('message');
    winnerScores = [sessionStorage.getItem('playerPoints'), sessionStorage.getItem('computerPoints')];
} else {
    winnerScores = [0, 0];
}

buttonPlayAgain.addEventListener('click', playAgain);

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', playGame);
}

function playGame(e) {
    let playerSelection = e.target.classList.value;
    let computerSelection = Math.random();

    if (computerSelection < .34) {
        computerSelection = 'rock';
    } else if (computerSelection <= .67) {
        computerSelection = 'paper';
    } else {
        computerSelection = 'scissors';
    }

    let result = checkWinner(playerSelection, computerSelection);

    if (result === 'Player') {
        result += ' wins!';
        winnerScores[0]++;
    }

    if (result === 'Computer') {
        result += ' wins!';
        winnerScores[1]++;
    }

    if (result === 'Draw') {
        result += '. It\'s a tie!'
    }

    playerScore.innerHTML = 'Player: [ ' + winnerScores[0] + ' ] ';
    sessionStorage.setItem('playerScore', 'Player: [ ' + winnerScores[0] + ' ] ');
    sessionStorage.setItem('playerPoints', winnerScores[0]);

    computerScore.innerHTML = 'Computer: [ ' + winnerScores[1] + ' ]';
    sessionStorage.setItem('computerScore', 'Computer: [ ' + winnerScores[1] + ' ]');
    sessionStorage.setItem('computerPoints', winnerScores[1]);

    message.innerHTML = 'Player: <strong>' + playerSelection + '</strong> | Computer: <strong>' + computerSelection + '</strong><br>' + result;
    sessionStorage.setItem('message', 'Player: <strong>' + playerSelection + '</strong> | Computer: <strong>' + computerSelection + '</strong><br>' + result);
}

function checkWinner(player, computer) {
    if (player === computer) {
        return 'Draw';
    }

    if (player === 'rock') {
        if (computer === 'paper') {
            return 'Computer';
        } else {
            return 'Player';
        }
    }

    if (player === 'paper') {
        if (computer === 'scissors') {
            return 'Computer';
        } else {
            return 'Player';
        }
    }

    if (player === 'scissors') {
        if (computer === 'rock') {
            return 'Computer';
        } else {
            return 'Player';
        }
    }
}

function playAgain() {
    sessionStorage.clear();
    window.location.reload();
}