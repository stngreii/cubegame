let score = 0;
let timeLeft = 35;
const scoreToTriggerJumpscare = 20;

const box = document.getElementById('box');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

function moveBox() {
    const gameArea = document.getElementById('gameArea');
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;
    const boxSize = box.clientWidth;

    const newX = Math.random() * (areaWidth - boxSize);
    const newY = Math.random() * (areaHeight - boxSize);

    box.style.left = `${newX}px`;
    box.style.top = `${newY}px`;
}

box.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    moveBox();

    if (score === scoreToTriggerJumpscare) {
        triggerJumpscare();
    }
});

function startGame() {
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Waktu Tersisa: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            endGame(`Game over! Skorr terakhirmu adalah ${score}.`);
        }
    }, 1000);
}

function triggerJumpscare() {
    // Hide the game area and show jumpscare screen
    document.body.innerHTML = `
        <div id="jumpscare">
            <h1>DUARRR MEKIII</h1>
            <audio autoplay>
                <source src="jumpscare.mp3" type="audio/mpeg">
            </audio>
        </div>
    `;

    setTimeout(() => {
        endGame("Game over! Kamu telah mendapat meki iwan");
    }, 15000); // 10 seconds of jumpscare
}

function endGame(message) {
    // Display Game Over screen with options
    document.body.innerHTML = `
        <div id="gameOver">
            <h1>${message}</h1>
            <button onclick="restartGame()">Restart</button>
            <button onclick="nextLevel()">Next Level</button>
        </div>
    `;
}

function restartGame() {
    window.location.reload(); // Reloads the game
}

function nextLevel() {
    alert("Proceeding to the next level!"); // Add your next level logic here
}

window.onload = startGame;
