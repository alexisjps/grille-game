const colors = ['red', 'green', 'blue', 'yellow'];
const gridSize = 7;
const gameGrid = document.getElementById('gameGrid');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
let elapsedTime = 0;
let gameInterval;
let completed = false;
let score = 0;
const winningScore = 22;

function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        cell.addEventListener('click', () => {
            checkAdjacentCells(i);
        });
        cell.tabIndex = 0; // Ajoutez cette ligne
        gameGrid.appendChild(cell);
    }
}

function checkAdjacentCells(index) {
    const currentCell = gameGrid.children[index];
    currentCell.focus();
    const currentColor = currentCell.style.backgroundColor;

    const adjacentCells = [
        index - gridSize,
        index + gridSize,
        index % gridSize !== 0 ? index - 1 : -1,
        (index + 1) % gridSize !== 0 ? index + 1 : -1
    ];

    let matches = 0;

    adjacentCells.forEach(adjacentIndex => {
        if (adjacentIndex >= 0 && adjacentIndex < gridSize * gridSize) {
            const adjacentCell = gameGrid.children[adjacentIndex];
            if (adjacentCell.style.backgroundColor === currentColor) {
                adjacentCell.style.backgroundColor = '';
                matches++;
            }
        }
    });

    if (matches > 0) {
        currentCell.style.backgroundColor = '';
        score += matches;
        scoreElement.innerText = `Score : ${score}`;
        setTimeout(() => {
            currentCell.blur();
        }, 100);
    } else {
        setTimeout(() => {
            currentCell.blur();
        }, 100);
    }
    checkGameCompletion();
}

function showRulesModal() {
    const rulesModal = new bootstrap.Modal(document.getElementById('rulesModal'), {
        keyboard: false
    });
    rulesModal.show();
}

function startTimer() {
    gameInterval = setInterval(() => {
        if (!completed) {
            elapsedTime++;
            timerElement.innerText = `Temps écoulé : ${elapsedTime}s`;
        }
    }, 1000);
}

function checkGameCompletion() {
    if (score >= winningScore) {
        completed = true;
        clearInterval(gameInterval);
        timerElement.style.color = 'green';
        timerElement.style.fontWeight = 'bold';
        scoreElement.style.color = 'green';
        scoreElement.style.fontWeight = 'bold';
    }
}

createGrid();
showRulesModal();
startTimer();
