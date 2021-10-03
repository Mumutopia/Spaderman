import { board } from "./board.js";
import { Player } from "./players.js";
console.log(board);

let player1 = new Player(5, 15, 0, 0, "bob");
let player2 = new Player(10, 15, 0, 0, "Tim");

function movingInput(event) {
  //this will make the players1 or 2 moving depending on which input pressed.
  switch (event.key) {
    case "ArrowRight":
      if (player1.xPosition < board.length) {
        player1.movingRight();
      }
      break;
    case "ArrowDown":
      if (player1.yPosition > 0) {
        player1.movingDown();
      }
      break;
    case "ArrowUp":
      if (player1.yPosition < board.length) {
        player1.movingUp();
      }
      break;
    case "ArrowLeft":
      if (player1.xPosition > 0) {
        player1.movingLeft();
      }
      break;

    default:
      break;
  }
}

document.addEventListener("keyup", (event) => movingInput(event));
