const gridContainer = document.getElementById('grid-container');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const clearButton = document.getElementById('clear-button');
let intervalId;

function createGrid() {
  for (let i = 0; i < 2500; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', toggleCellState);
    gridContainer.appendChild(cell);
  }
}

function toggleCellState() {
  this.classList.toggle('alive');
}

function startGame() {
  intervalId = setInterval(evolve, 200);
  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopGame() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function clearGrid() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('alive');
  });
}

function evolve() {
  const cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
    const aliveNeighbors = countAliveNeighbors(cell);
    if (cell.classList.contains('alive')) {
      if (aliveNeighbors < 2 || aliveNeighbors > 3) {
        cell.classList.remove('alive');
      }
    } else {
      if (aliveNeighbors === 3) {
        cell.classList.add('alive');
      }
    }
  });
}

function countAliveNeighbors(cell) {
  const index = Array.from(gridContainer.children).indexOf(cell);
  const neighbors = [
    index - 51, index - 50, index - 49,
    index - 1,             index + 1,
    index + 49, index + 50, index + 51
  ];

  return neighbors.reduce((count, neighbor) => {
    const neighborCell = gridContainer.children[neighbor];
    return count + (neighborCell && neighborCell.classList.contains('alive') ? 1 : 0);
  }, 0);
}

createGrid();
startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
clearButton.addEventListener('click', clearGrid);
