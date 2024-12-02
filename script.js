
let player1Money = 100;
let player2Money = 100;
let currentPlayer = 1;
let multiplier = 2;
let log = [];

function updateUI() {
    document.getElementById('player1-money').textContent = `$${player1Money}`;
    document.getElementById('player2-money').textContent = `$${player2Money}`;
    document.getElementById('turn-indicator').textContent = `Player ${currentPlayer}'s Turn`;
    const gameLog = document.getElementById('game-log');
    gameLog.innerHTML = log.map(entry => `<p>${entry}</p>`).join('');
}

function endGame(message) {
    log.push(message);
    updateUI();
    document.querySelector('.actions').innerHTML = '<p>Game Over</p>';
}

document.getElementById('start-game-button').addEventListener('click', () => {
    multiplier = parseFloat(document.getElementById('multiplier-input').value) || 2;
    document.getElementById('setup-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    updateUI();
});

document.getElementById('send-button').addEventListener('click', () => {
    const sendAmount = parseFloat(document.getElementById('send-amount-input').value) || 0;
    if (sendAmount <= 0) {
        alert('Please enter a valid amount to send!');
        return;
    }
    if (currentPlayer === 1 && sendAmount <= player1Money) {
        player1Money -= sendAmount;
        player2Money += sendAmount * multiplier;
        log.push(`Player 1 sent $${sendAmount}, Player 2 received $${sendAmount * multiplier}`);
    } else if (currentPlayer === 2 && sendAmount <= player2Money) {
        player2Money -= sendAmount;
        player1Money += sendAmount * multiplier;
        log.push(`Player 2 sent $${sendAmount}, Player 1 received $${sendAmount * multiplier}`);
    } else {
        alert('Not enough money to send!');
        return;
    }
    currentPlayer = 3 - currentPlayer;
    updateUI();
});

document.getElementById('keep-button').addEventListener('click', () => {
    if (currentPlayer === 1) {
        endGame('Player 1 kept the money. Game over.');
    } else {
        endGame('Player 2 kept the money. Game over.');
    }
});

updateUI();
