import { board } from "./board.js";
import { Player } from "./players.js";

let player1 = new Player(1,1, 0, 5, "bob");
let player2 = new Player(8,8, 0, 0, "Tim");
let player1Score = document.getElementById("player1-score");
let player2Score = document.getElementById("player2-score");
let player1Bombs = document.getElementById("player1-bombs");
let player2Bombs = document.getElementById("player2-bombs");
let timeLeft = document.getElementById("time-left");
let wrapperSelector = document.getElementById("wrapper");
createGrid();
randomizeBoardContent();
printDisplay();
let printPlayer1Position = document.getElementById(`${player1.xPosition}.${player1.yPosition}`);
printPlayer1Position.classList.add("player1-board");
let printPlayer2Position = document.getElementById(`${player2.xPosition}.${player2.yPosition}`);
printPlayer2Position.classList.add("player2-board");
function input(event) {
  //this function will listen to the input and act accordingly
  if (!player1.busy) {
    switch (event.key) {
      case "ArrowRight":
        if (player1.xPosition < board.length - 1) {
          player1.formerPosition(printPlayer1Position, "player1");
          player1.movingRight();
          printPlayer1Position = document.getElementById(
            `${player1.xPosition}.${player1.yPosition}`
          );
          player1.actualPosition(printPlayer1Position, "player1");
        }
        break;
      case "ArrowDown":
        if (player1.yPosition < board.length - 1) {
          player1.formerPosition(printPlayer1Position, "player1");
          player1.movingDown();
          printPlayer1Position = document.getElementById(
            `${player1.xPosition}.${player1.yPosition}`
          );
          player1.actualPosition(printPlayer1Position, "player1");
        }
        break;
      case "ArrowUp":
        if (player1.yPosition > 0) {
          player1.formerPosition(printPlayer1Position, "player1");
          player1.movingUp();
          printPlayer1Position = document.getElementById(
            `${player1.xPosition}.${player1.yPosition}`
          );
          player1.actualPosition(printPlayer1Position, "player1");
        }
        break;
      case "ArrowLeft":
        if (player1.xPosition > 0) {
          player1.formerPosition(printPlayer1Position, "player1");
          player1.movingLeft();
          printPlayer1Position = document.getElementById(
            `${player1.xPosition}.${player1.yPosition}`
          );
          player1.actualPosition(printPlayer1Position, "player1");
        }
        break;
      case "m":
        player1.isBusy();
        player1.dig(printPlayer1Position);
        break;
      case "l":
        player1.plantBomb();
        break;

      default:
        break;
    }
  }
  if (!player2.busy) {
    switch (event.key) {
      case "d":
        if (player2.xPosition < board.length - 1) {
          player2.formerPosition(printPlayer2Position, "player2");
          player2.movingRight();
          printPlayer2Position = document.getElementById(
            `${player2.xPosition}.${player2.yPosition}`
          );
          player2.actualPosition(printPlayer2Position, "player2");
        }
        break;
      case "s":
        if (player2.yPosition < board.length - 1) {
          player2.formerPosition(printPlayer2Position, "player2");
          player2.movingDown();
          printPlayer2Position = document.getElementById(
            `${player2.xPosition}.${player2.yPosition}`
          );
          player2.actualPosition(printPlayer2Position, "player2");
        }
        break;
      case "z":
        if (player2.yPosition > 0) {
          player2.formerPosition(printPlayer2Position, "player2");
          player2.movingUp();
          printPlayer2Position = document.getElementById(
            `${player2.xPosition}.${player2.yPosition}`
          );
          player2.actualPosition(printPlayer2Position, "player2");
        }
        break;
      case "q":
        if (player2.xPosition > 0) {
          player2.formerPosition(printPlayer2Position, "player2");
          player2.movingLeft();
          printPlayer2Position = document.getElementById(
            `${player2.xPosition}.${player2.yPosition}`
          );
          player2.actualPosition(printPlayer2Position, "player2");
        }
        break;
      case "f":
        player2.isBusy();
        player2.dig(printPlayer2Position);
        break;
      case "g":
        player2.plantBomb();
        break;

      default:
        break;
    }
  }
}

function createGrid() {
  let insertDiv = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      insertDiv += `<div id="${j}.${i}"></div>`;
    }
  }
  wrapperSelector.innerHTML = insertDiv;
}

function printDisplay() {
  let count = 10;
  let wholeDisplay = setInterval(() => {
    player1Score.innerText = player1.score;
    player2Score.innerText = player2.score;
    player1Bombs.innerText = player1.bomb;
    // player2Bombs.innerText = player2.bomb;
    timeLeft.innerText = count;
    count--;
    if (count < 0) {
      clearInterval(wholeDisplay);
      printWinner();
    }
  }, 1000);
}

function printWinner() {
  if (player1.score > player2.score) { alert("Blue Wins !");   
  } else if ((player1.score < player2.score)) { alert("Red Wins !")
  } else alert("Draw !");
}

function randomizeBoardContent() {
  //put randomly inside the boards  : rubies and bombs
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j] = Math.floor(Math.random() * 10);
      if (board[i][j] < 2) {
        board[i][j] = "R";
      } else if (board[i][j] < 4) {
        board[i][j] = "BR";
      } else if (board[i][j] < 5) {
        board[i][j] = "GR";
      } else if (board[i][j] < 6) {
        board[i][j] = "B";
      }
    }
  }
  console.log(board);
}

document.addEventListener("keyup", (event) => input(event));
