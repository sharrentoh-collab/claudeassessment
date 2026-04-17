// Preschool Fun Games Script

let currentGame = 'menu';
let correctAnswer = null;

// DOM Elements
const menuScreen = document.getElementById('menu');
const gameScreen = document.getElementById('game');
const countGame = document.getElementById('count-game');
const colorGame = document.getElementById('color-game');
const letterGame = document.getElementById('letter-game');
const applesDiv = document.getElementById('apples');
const bucket = document.querySelector('.bucket');
const uppercaseLetter = document.getElementById('uppercase-letter');
const letterOpts = document.querySelectorAll('.letter-opt');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Menu buttons
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const game = btn.dataset.game;
            showGame(game);
        });
    });

    // Back button
    document.getElementById('back-btn').addEventListener('click', showMenu);

    // Option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const value = e.target.dataset.value || e.target.dataset.color || e.target.textContent.toLowerCase();
            checkAnswer(currentGame, value, e.target);
        });
    });
});

// Show menu
function showMenu() {
    currentGame = 'menu';
    menuScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
}

// Show game
function showGame(gameType) {
    currentGame = gameType;
    menuScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    countGame.classList.add('hidden');
    colorGame.classList.add('hidden');
    letterGame.classList.add('hidden');

    if (gameType === 'count') {
        countGame.classList.remove('hidden');
        generateCount();
    } else if (gameType === 'color') {
        colorGame.classList.remove('hidden');
        generateColor();
    } else if (gameType === 'letter') {
        letterGame.classList.remove('hidden');
        generateLetter();
    }
}

// Generate Count the Apples
function generateCount() {
    const numApples = Math.floor(Math.random() * 3) + 1; // 1-3
    correctAnswer = numApples.toString();
    applesDiv.innerHTML = '';
    for (let i = 0; i < numApples; i++) {
        const apple = document.createElement('span');
        apple.className = 'apple';
        apple.textContent = '🍎';
        applesDiv.appendChild(apple);
    }
}

// Generate Color Match
function generateColor() {
    const colors = ['red', 'blue', 'green'];
    const target = colors[Math.floor(Math.random() * 3)];
    correctAnswer = target;
    bucket.style.color = target;

    const objects = document.querySelectorAll('.color-obj');
    const correctIndex = Math.floor(Math.random() * 3);
    objects.forEach((obj, index) => {
        let color;
        if (index === correctIndex) {
            color = target;
        } else {
            do {
                color = colors[Math.floor(Math.random() * 3)];
            } while (color === target);
        }
        obj.dataset.color = color;
        obj.style.color = color;
    });
}

// Generate Find the Letter
function generateLetter() {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
    correctAnswer = letter.toLowerCase();
    uppercaseLetter.textContent = letter;

    const options = [correctAnswer];
    while (options.length < 3) {
        const randLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
        if (!options.includes(randLetter)) {
            options.push(randLetter);
        }
    }
    // Shuffle
    options.sort(() => Math.random() - 0.5);
    letterOpts.forEach((opt, index) => {
        opt.textContent = options[index];
    });
}

// Check answer
function checkAnswer(gameType, value, btn) {
    if (value === correctAnswer) {
        // Correct
        btn.classList.add('bounce');
        setTimeout(() => {
            btn.classList.remove('bounce');
            // Confetti
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('div');
                star.textContent = '⭐';
                star.className = 'confetti';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = '50%';
                document.body.appendChild(star);
                setTimeout(() => star.remove(), 1000);
            }
            // New question
            if (gameType === 'count') generateCount();
            else if (gameType === 'color') generateColor();
            else if (gameType === 'letter') generateLetter();
        }, 500);
    } else {
        // Wrong
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 500);
    }
}