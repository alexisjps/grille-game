const colors = ['red', 'green', 'blue', 'yellow'];
const gridSize = 5;
const gameGrid = document.getElementById('gameGrid');

function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        cell.addEventListener('click', () => {
            checkAdjacentCells(i);
        });
        gameGrid.appendChild(cell);
    }
}

function checkAdjacentCells(index) {
    const currentCell = gameGrid.children[index];
    const currentColor = currentCell.style.backgroundColor;

    const adjacentCells = [
        index - gridSize, // Top
        index + gridSize, // Bottom
        index % gridSize !== 0 ? index - 1 : -1, // Left
        (index + 1) % gridSize !== 0 ? index + 1 : -1 // Right
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
    }
}

createGrid();
