const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";

const width = canvas.clientWidth;
const height = canvas.clientHeight;
const cellW = 5;

const col = width / cellW;
const row = height / cellW;

const cells = new Array(col);

function initBoard() {
  let board = Array.from(cells, () => new Array(row));

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      board[i][j] = Math.round(Math.random());
    }
  }

  return board;
}

function initEmpty() {
  let empty = Array.from(cells, () => new Array(row));

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      empty[i][j] = 0;
    }
  }

  return empty;
}

function drawCells(board) {
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (board[i][j] === 1) {
        ctx.fillRect(i * cellW, j * cellW, cellW, cellW);
      }
    }
  }
}

let board = initBoard();

function life() {
  let next = initEmpty();

  for (let i = 1; i < col - 1; i++) {
    for (let j = 1; j < row - 1; j++) {
      let neighbors = 0;

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          neighbors += board[i + x][j + y];
        }
      }

      neighbors -= board[i][j];

      if (board[i][j] == 1 && neighbors < 2) next[i][j] = 0;
      else if (board[i][j] == 1 && neighbors > 3) next[i][j] = 0;
      else if (board[i][j] == 0 && neighbors == 3) next[i][j] = 1;
      else next[i][j] = board[i][j];
    }
  }

  board = next;
  drawCells(board);
}

function run() {
  ctx.clearRect(0, 0, width, height);
  //code here

  life();

  requestAnimationFrame(run);
}

run();
