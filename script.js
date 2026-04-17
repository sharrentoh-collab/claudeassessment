// Preschool Fun Games Script

let currentGame = 'menu';
let correctAnswer = null;

// DOM Elements
const menuScreen = document.getElementById('menu');
const gameScreen = document.getElementById('game');
const countGame = document.getElementById('count-game');
const colorGame = document.getElementById('color-game');
const letterGame = document.getElementById('letter-game');
const shapeGame = document.getElementById('shape-game');
const mathGame = document.getElementById('math-game');
const animalGame = document.getElementById('animal-game');
const applesDiv = document.getElementById('apples');
const bucket = document.querySelector('.bucket');
const uppercaseLetter = document.getElementById('uppercase-letter');
const letterOpts = document.querySelectorAll('.letter-opt');

const allGameDivs = [countGame, colorGame, letterGame, shapeGame, mathGame, animalGame];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', () => showGame(btn.dataset.game));
    });
    document.getElementById('back-btn').addEventListener('click', showMenu);

    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const value = e.target.dataset.value || e.target.dataset.color || e.target.textContent.trim().toLowerCase();
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
    allGameDivs.forEach(d => d.classList.add('hidden'));

    const generators = {
        count: [countGame, generateCount],
        color: [colorGame, generateColor],
        letter: [letterGame, generateLetter],
        shape: [shapeGame, generateShape],
        math: [mathGame, generateMath],
        animal: [animalGame, generateAnimal],
    };
    if (generators[gameType]) {
        generators[gameType][0].classList.remove('hidden');
        generators[gameType][1]();
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

// Generate Shape Match
const shapes = [
    { emoji: '🔴', name: 'circle' },
    { emoji: '🔷', name: 'diamond' },
    { emoji: '⬛', name: 'square' },
    { emoji: '🔺', name: 'triangle' },
    { emoji: '⭐', name: 'star' },
];

function generateShape() {
    const correct = shapes[Math.floor(Math.random() * shapes.length)];
    correctAnswer = correct.name;
    document.getElementById('shape-display').textContent = correct.emoji;

    const options = [correct.name];
    while (options.length < 3) {
        const rand = shapes[Math.floor(Math.random() * shapes.length)].name;
        if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('shape-options');
    container.innerHTML = '';
    options.forEach(name => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = name;
        btn.addEventListener('click', () => checkAnswer('shape', name, btn));
        container.appendChild(btn);
    });
}

// Generate Simple Math
function generateMath() {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 3) + 1;
    const sum = a + b;
    correctAnswer = sum.toString();

    document.getElementById('math-question').textContent = `${a} + ${b} = ?`;

    const options = [sum];
    while (options.length < 3) {
        const rand = Math.floor(Math.random() * 6) + 1;
        if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('math-options');
    container.innerHTML = '';
    options.forEach(num => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = num;
        btn.addEventListener('click', () => checkAnswer('math', num.toString(), btn));
        container.appendChild(btn);
    });
}

// Generate Animal Match
const animals = [
    { emoji: '🐶', name: 'dog' },
    { emoji: '🐱', name: 'cat' },
    { emoji: '🐸', name: 'frog' },
    { emoji: '🐧', name: 'penguin' },
    { emoji: '🦁', name: 'lion' },
    { emoji: '🐘', name: 'elephant' },
    { emoji: '🐮', name: 'cow' },
    { emoji: '🐼', name: 'panda' },
];

function generateAnimal() {
    const correct = animals[Math.floor(Math.random() * animals.length)];
    correctAnswer = correct.name;
    document.getElementById('animal-display').textContent = correct.emoji;

    const options = [correct.name];
    while (options.length < 3) {
        const rand = animals[Math.floor(Math.random() * animals.length)].name;
        if (!options.includes(rand)) options.push(rand);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('animal-options');
    container.innerHTML = '';
    options.forEach(name => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = name;
        btn.addEventListener('click', () => checkAnswer('animal', name, btn));
        container.appendChild(btn);
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
            else if (gameType === 'shape') generateShape();
            else if (gameType === 'math') generateMath();
            else if (gameType === 'animal') generateAnimal();
        }, 500);
    } else {
        // Wrong
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 500);
    }
}