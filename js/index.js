import { board } from "./board.js";
import { Player } from "./players.js";

let player1 = new Player(5, 15, 0, 5, "bob");
let player2 = new Player(10, 15, 0, 0, "Tim");

function input(event) {
  //this function will listen to the input and act accordingly
  if (!player1.busy) {
    switch (event.key) {
      case "ArrowRight":
        if (player1.xPosition < board.length) {
          player1.movingRight();
          console.log(player1);
        }
        break;
      case "ArrowDown":
        if (player1.yPosition > 0) {
          player1.movingDown();
          console.log(player1);
        }
        break;
      case "ArrowUp":
        if (player1.yPosition < board.length) {
          player1.movingUp();
          console.log(player1);
        }
        break;
      case "ArrowLeft":
        if (player1.xPosition > 0) {
          player1.movingLeft();
          console.log(player1);
        }
        break;
      case "m":
        player1.isBusy();
        player1.dig();
        break;
      case "l":
        player1.plantBomb();
        
        break;

      default:
        break;
    }
  }
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

randomizeBoardContent();

document.addEventListener("keyup", (event) => input(event));
