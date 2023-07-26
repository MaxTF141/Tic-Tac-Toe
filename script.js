let backgroundBoard = document.querySelector('.board');
let emptyArray = [];
let playerXInput = document.querySelector('.player-x');
let playerOInput = document.querySelector('.player-o');
let playButton = document.querySelector('.start-button');
let welcome = document.querySelector('.add');
let game = document.querySelector('.game');

playButton.addEventListener('click', (e) => {
  console.log(e.target.classList)
  playButton.classList.remove('welcome');
  welcome.classList.add('hideWelcome');
  const styleElement = document.createElement('style');
  styleElement.innerHTML = '.game { filter: blur(0px); }';
  document.head.appendChild(styleElement);
})

const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
];

let currentPlayer = 'X';

function printBoard() {
  console.log('-------------');
  for (let row of board) {
    console.log(`| ${row[0]} | ${row[1]} | ${row[2]} |`);
    console.log('-------------');
  }
}

function checkWin() {
  const winningPatterns = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]] && board[a[0]][a[1]] !== ' ') {
      return true;
    }
  }
  return false;
}

function checkTie() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === ' ') {
        return false;
      }
    }
  }
  return true;
}

function play(row, col) {
  if (board[row][col] === ' ') {
    board[row][col] = currentPlayer;

    if (checkWin()) {
      alert(`Player ${currentPlayer} wins!`);
      resetBoard();
      return;
    }

    if (checkTie()) {
      alert("It's a tie!");
      resetBoard();
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    printBoard();
    updateBoardUI();
  } else {
    console.log('Cell already occupied, please choose a different cell.');
  }
}

function resetBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      board[row][col] = ' ';
    }
  }
  currentPlayer = 'X';
  updateBoardUI();
}

function updateBoardUI() {
  const cells = document.querySelectorAll('.board td');
  cells.forEach((cell, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    cell.textContent = board[row][col];
    cell.setAttribute('data-value', board[row][col]); // Add data-value attribute to the cell

    // Set the custom cursor for X and O cells
    if (currentPlayer === 'X') {
      cell.style.cursor = `url("./x-cursor.png"), auto`;
    } else if (currentPlayer === 'O') {
      cell.style.cursor = `url("./o-cursor.png"), auto`;
    } else {
      cell.style.cursor = 'pointer';
    }
  });
}

// Reset cursor to default when leaving the table
const boardTable = document.querySelector('.board');
boardTable.addEventListener('mouseleave', () => {
  document.body.style.cursor = 'default';
});

updateBoardUI();