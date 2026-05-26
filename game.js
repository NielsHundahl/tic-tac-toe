const cells = document.querySelectorAll('.cell');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
];

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;

function checkWinner() {
  for (const [a, b, c] of WINNING_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo: [a, b, c] };
    }
  }
  if (board.every(cell => cell !== null)) return { winner: 'draw' };
  return null;
}

function handleClick(e) {
  const index = parseInt(e.target.dataset.index);
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase(), 'taken');

  const result = checkWinner();
  if (result) {
    gameOver = true;
    if (result.winner === 'draw') {
      statusEl.textContent = "It's a draw!";
    } else {
      statusEl.textContent = `Player ${result.winner} wins! 🎉`;
      result.combo.forEach(i => cells[i].classList.add('win'));
    }
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function restart() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  statusEl.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restart);
