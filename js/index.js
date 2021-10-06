import { board } from "./board.js";
import { Player } from "./players.js";

let player1 = new Player(1, 1, 0, 5, "player1");
let player2 = new Player(8, 8, 0, 5, "player2");
let player1Score = document.getElementById("player1-score");
let player2Score = document.getElementById("player2-score");
let player1Bombs = document.getElementById("player1-bombs");
let player2Bombs = document.getElementById("player2-bombs");
let bombP1Radius = 2;
let players1PlantBomb = document.getElementById(
  `${player1.xPosition}.${player1.yPosition}`
);
let timeLeft = document.getElementById("time-left");
let wrapperSelector = document.getElementById("wrapper");
createGrid();
randomizeBoardContent();
printDisplay();
let printPlayer1Position = document.getElementById(
  `${player1.xPosition}.${player1.yPosition}`
);
printPlayer1Position.classList.add("player1-board");
let printPlayer2Position = document.getElementById(
  `${player2.xPosition}.${player2.yPosition}`
);
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
        if (player1.bomb > 0) {
          player1.plantBomb(printPlayer1Position);
          bombHasBeenPlantedGoRushB(player1, player2, printPlayer1Position);
        }
      case "j":
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
        console.log(printPlayer2Position);
        if (player2.bomb > 0) {
          player2.plantBomb(printPlayer2Position);
          bombHasBeenPlantedGoRushB(player2, player1);
        }
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
  let count = 120;
  let wholeDisplay = setInterval(() => {
    player1Score.innerText = player1.score;
    player2Score.innerText = player2.score;
    player1Bombs.innerText = player1.bomb;
    player2Bombs.innerText = player2.bomb;
    timeLeft.innerText = count;
    count--;
    if (count < 0) {
      clearInterval(wholeDisplay);
      printWinner();
    }
  }, 1000);
}

function printWinner() {
  if (player1.score > player2.score) {
    alert("Blue Wins !");
  } else if (player1.score < player2.score) {
    alert("Red Wins !");
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

function checkRadius(bomb, radius, player) {
  if (
    bomb[0] - radius <= player.yPosition &&
    bomb[0] + radius >= player.yPosition &&
    bomb[1] - radius <= player.xPosition &&
    bomb[1] + radius >= player.xPosition &&
    (bomb[0] === player.yPosition || bomb[1] === player.xPosition)
  ) {
    return true;
  } else return false;
}

function bombHasBeenPlantedGoRushB(terrorist, ct, position) {
  // <== sorry for the name I coudln't resist...
  const plantedBomb = [terrorist.yPosition, terrorist.xPosition];
  console.log(plantedBomb);
  console.log(plantedBomb[0] - bombP1Radius <= terrorist.yPosition);

  setTimeout(function () {
    //this makes the bomb blows in a linear pattern and check if P1 or P2 is inside the "radius"
    if (checkRadius(plantedBomb, bombP1Radius, terrorist)) {
      console.log(`${terrorist.name}touché`);
      terrorist.score -= 200;
      const bufferedPosition = document.getElementById( //I use this to get the actual position of the player
        `${terrorist.xPosition}.${terrorist.yPosition}`
      );
      terrorist.Stunned(bufferedPosition,"player1");
      console.log(plantedBomb);
    }
    if (checkRadius(plantedBomb, bombP1Radius, ct)) {
      console.log(`${ct.name}touché`);
      ct.score -= 200;
      const bufferedPosition = document.getElementById( //I use this to get the actual position of the player,
        `${ct.xPosition}.${ct.yPosition}`
      );
      ct.Stunned(bufferedPosition,"player2");
      console.log(player2.score);
      console.log(plantedBomb);
    }
    (function displayRadiusX() { //Yay my first IIFE !! it adds the bomb radius on the horizontal axe 
      for (let i = (-bombP1Radius); i <= bombP1Radius; i++) {
        position = document.getElementById(
          `${plantedBomb[1]}.${plantedBomb[0]+i}`
        );
        const bufferPosition = position;
        if (bufferPosition != null) {
        position.classList.add("bomb-radius");
        setInterval(() => {
          bufferPosition.classList.remove("bomb-radius");
        }, 200);
      }
    }
    })();
    (function displayRadiusY() { //Yay my 2nd IIFE !! it adds the bomb radius on the vertical axe 
      for (let i = (-bombP1Radius); i <= bombP1Radius; i++) {
        position = document.getElementById(
          `${plantedBomb[1]+i}.${plantedBomb[0]}`
        );
        const bufferPosition = position;
        if (bufferPosition != null) {
        position.classList.add("bomb-radius");
        setInterval(() => {
          bufferPosition.classList.remove("bomb-radius");
        }, 200);
      }
      }
    })();
  }, 2000);
  
}

document.addEventListener("keyup", (event) => input(event));
