let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтальные линии
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикальные линии
    [0, 4, 8], [2, 4, 6]             // диагональные линии
];

const gameBoard = document.getElementById("gameBoard");
const message = document.getElementById("message");

gameBoard.addEventListener("click", handleCellClick);

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute("data-index");

    if (board[cellIndex] !== "" || !gameActive) return;

    board[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkResult() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            message.innerText = `Победитель: ${currentPlayer}`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        message.innerText = "Ничья!";
        gameActive = false;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    message.innerText = "";
    Array.from(document.getElementsByClassName("cell")).forEach(cell => (cell.innerText = ""));
}
