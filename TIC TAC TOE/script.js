const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;

        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = gameActive ? `Player ${currentPlayer}'s turn` : statusText.textContent;
        }
    });
});

// Check for a winner or draw
function checkWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} wins!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    }
}

// Reset the game
resetButton.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
});
