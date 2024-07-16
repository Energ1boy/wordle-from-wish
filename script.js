const maxAttempts = 6;
let attempts = 0;
let targetWord = "";

// Fetch words from words.txt and select a word based on the current date
fetch('words.txt')
    .then(response => response.text())
    .then(text => {
        const words = text.trim().split('\n');
        const date = new Date();
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        targetWord = words[dayOfYear % words.length].toLowerCase();
    });

const grid = document.getElementById('grid');
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const message = document.getElementById('message');

// Create the grid
for (let i = 0; i < maxAttempts * 5; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}

submitGuess.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    if (guess.length !== 5) {
        message.textContent = "Please enter a 5-letter word.";
        return;
    }
    if (attempts >= maxAttempts) {
        message.textContent = "No more attempts left!";
        return;
    }

    // Update the grid
    const start = attempts * 5;
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[start + i];
        cell.textContent = guess[i];
        if (guess[i] === targetWord[i]) {
            cell.classList.add('green');
        } else if (targetWord.includes(guess[i])) {
            cell.classList.add('yellow');
        } else {
            cell.classList.add('gray');
        }
    }

    attempts++;
    guessInput.value = '';

    if (guess === targetWord) {
        message.textContent = "Congratulations! You've guessed the word!";
        submitGuess.disabled = true;
    } else if (attempts === maxAttempts) {
        message.textContent = `Game over! The word was "${targetWord}".`;
    }
});
