const gridSize = 600;
const context = canvas.getContext("2d");

let grid;
let sizeOfGrid = prompt('The size of our grid - x, y');
sizeOfGrid = sizeOfGrid.split(',').map(Number);

const x = sizeOfGrid[0];
const y = sizeOfGrid[1]
const numOfCellsInRow = x;

currentGrid = grid

const setIntervalX = (fn, delay, times) => {
  if(!times) return

  setTimeout(() => {
    fn() 
    setIntervalX(fn, delay, times-1)
  }, delay)
}

function createGrid() {
  grid = new Array;
  for (i = 0; i < x; i++) {
    let currentRow = prompt(`Enter ${i+1} row. Number of symbols: ${x}`);
    currentRow = currentRow.split('').map(Number)
    grid.unshift(currentRow);
  }
  if (grid[selectedX][selectedY] == 1) {
    finalResult++
    console.log(`result = ${finalResult}`)
  }
  return grid;
}

let finalCmd = prompt("Choose a cell & N generations")
finalCmd = finalCmd.split(',').map(Number);
const selectedX = finalCmd[0];
const selectedY = finalCmd[1];
const turns = finalCmd[2];
let finalResult = 0;

const cellSize = gridSize / numOfCellsInRow;
const cellStrokeColor = '#aaa'

function drawGrid () {
  context.strokeStyle = cellStrokeColor;
  context.fillStyle = 'red';
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      const value = grid[y][x];
      if (value == 1) {
        context.fillStyle = 'green';
        context.fillRect(
          x * cellSize,
          y * cellSize,
          cellSize,
          cellSize
        );
      } else {
        context.fillStyle = 'red';
        context.fillRect(
          x * cellSize,
          y * cellSize,
          cellSize,
          cellSize
        );
      }
      context.strokeRect(
        x * cellSize,
        y * cellSize,
        cellSize,
        cellSize
      );
    }
  }
}

setIntervalX(step, 100, turns-1);

function createEmptyArray() {
  let arr = new Array(numOfCellsInRow);
  for (let x = 0; x < numOfCellsInRow; x++) {
    let cols = new Array(numOfCellsInRow);
    for (let y = 0; y < numOfCellsInRow; y++) {
      cols[y] = false;
    }
    arr[x] = cols;
  }
  return arr;
}

function step() {
  let newArray = createEmptyArray();
  for (let y = 0; y < numOfCellsInRow; y++) {
    for (let x = 0; x < numOfCellsInRow; x++) {
      const neighbours = getNeighbourCount(x, y);
      if (grid[x][y]) { //if green
        if (neighbours == 2 || neighbours == 3 || neighbours == 6) {
          newArray[x][y] = 1;
        } else {
          newArray[x][y] = 0;
        }
      } else { //if red
        if (neighbours == 3 || neighbours == 6) {
          newArray[x][y] = 1;
        } else {
          newArray[x][y] = 0;
        }
      }
    }
  }
  
  grid = newArray;
  if (grid[selectedX][selectedY] == 1) {
    finalResult++
    document.getElementById('result').innerHTML = `Result: ${finalResult}`;
    console.log(`result from step = ${finalResult}`)
  }

  
  drawGrid(); 
}

function getNeighbourCount(x, y) {
  let count = 0;
  for (let yy = -1; yy < 2; yy++) {
    for (let xx = -1; xx < 2; xx++) {
      if (xx == 0 && yy == 0) continue; //not check the cell itself
      if (x + xx < 0 || x + xx > numOfCellsInRow - 1) continue; //negative and past length on x
      if (y + yy < 0 || y + yy > numOfCellsInRow - 1) continue; //negative and past length on y
      if (grid[x + xx][y + yy]) count++;
    }
  }
  return count;
}

window.onload = () => {
  const canvas = document.getElementById('canvas');
  createGrid();
  drawGrid();
}
