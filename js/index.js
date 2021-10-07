import { board } from "./board.js";
import { Player } from "./players.js";
import { gamepad } from "./gamepad.js";

// gamepad.connect()

let player1 = new Player(1, 1, 0, 5, "player1");
let player2 = new Player(8, 8, 0, 5, "player2");
let digAudio = [
  new Audio("/sounds/digging.mp3"),
  new Audio("/sounds/digging2.mp3"),
];
export let getItemAudio = [
  new Audio("/sounds/get-item.mp3"),
  new Audio("/sounds/get-item2.mp3"),
  new Audio("/sounds/get-item3.mp3"),
];
let gameAudio = new Audio("/sounds/game-music2.mp3");
let gameIntro = new Audio("/sounds/intro2.mp3");
let gameOutro = new Audio("/sounds/intro2.mp3");
let bombAudio = [
  new Audio("/sounds/bomb1.mp3"),
  new Audio("/sounds/bomb2.mp3"),
  new Audio("/sounds/bomb3.mp3"),
  new Audio("/sounds/bomb4.mp3"),
  new Audio("/sounds/bomb5.mp3"),
];
let player1Score = document.getElementById("player1-score");
let player2Score = document.getElementById("player2-score");
let player1Bombs = document.getElementById("player1-bombs");
let player2Bombs = document.getElementById("player2-bombs");
let startButton = document.getElementById("start-button");
let modalStart = document.getElementById("modal-start");
let modalEnd = document.getElementById("modal-end");
let displayWinner = document.getElementById("printWinner");
let bombP1Radius = 2;
let timeLeft = document.getElementById("time-left");
let wrapperSelector = document.getElementById("wrapper");
createGrid();
randomizeBoardContent();

let printPlayer1Position = document.getElementById(
  `${player1.xPosition}.${player1.yPosition}`
);
printPlayer1Position.classList.add("player1-board");
let printPlayer2Position = document.getElementById(
  `${player2.xPosition}.${player2.yPosition}`
);
printPlayer2Position.classList.add("player2-board");

gameIntro.play(); //so the intro songs plays straigth away.

startButton.onclick = function () {
  modalStart.style.display = "none";
  wrapperSelector.classList.remove("details");
  gameIntro.pause();
  startGame();
};

function startGame() {
  printDisplay();
  gameAudio.play();
  document.addEventListener("keyup", (event) => input(event)); //listen to all the keyboard input after the game starts
}

export function randomItemsSound() {
  //will trigger one of the 3 sound when an item is picked, after 1 second.
  setTimeout(() => {
    getItemAudio[Math.floor(Math.random() * 3)].play();
  }, 1000);
}

export function popDugItem(position, type) {
  //will pop the class of the item for 200ms so you see you dug something.
  setTimeout(() => {
    position.classList.add(`${type}`);
    setTimeout(() => {
      position.classList.remove(`${type}`);
    }, 200);
  }, 1000);
}

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
        digAudio[Math.floor(Math.random() * 2)].play();
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
        digAudio[Math.floor(Math.random() * 2)].play();
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
  //create and implement a grid on the DOM, based on the board.size
  let insertDiv = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      insertDiv += `<div id="${j}.${i}"></div>`;
    }
  }
  wrapperSelector.innerHTML = insertDiv;
}

function printDisplay() {
  //refresh score/time/bombs every seconds. Also works as the count down for the game.
  let count = 83;
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
  //pop the end game modal, based on the winner.
  gameOutro.play();
  if (player1.score > player2.score) {
    displayWinner.innerText = "Blue Wins !!";
    modalEnd.style.display = "flex";
  } else if (player1.score < player2.score) {
    displayWinner.innerText = "Red Wins !!";
    modalEnd.style.display = "flex";
  } else displayWinner.innerText = "Draw !";
  modalEnd.style.display = "flex";
}

function randomizeBoardContent() {
  //put items randomly  inside the boards  : rubies and bombs
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
  //use to detect if the players are caught in the bomb "radius", and make the radius linear.
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

  setTimeout(function () {
    //makes the bomb blows after 2 seconds
    if (checkRadius(plantedBomb, bombP1Radius, terrorist)) {
      terrorist.score -= 200;
      const bufferedPosition = document.getElementById(
        //I use this to get the actual position of the player
        `${terrorist.xPosition}.${terrorist.yPosition}`
      );
      terrorist.Stunned(bufferedPosition, terrorist.name);

      console.log(plantedBomb);
    }
    if (checkRadius(plantedBomb, bombP1Radius, ct)) {
      ct.score -= 200;
      const bufferedPosition = document.getElementById(
        //I use this to get the actual position of the player,
        `${ct.xPosition}.${ct.yPosition}`
      );
      ct.Stunned(bufferedPosition, ct.name);
      console.log(player2.score);
      console.log(plantedBomb);
    }
    bombAudio[Math.floor(Math.random() * 5)].play();
    (function displayRadiusX() {
      //Yay my first IIFE !! it displays the bomb radius on the horizontal axe
      for (let i = -bombP1Radius; i <= bombP1Radius; i++) {
        position = document.getElementById(
          `${plantedBomb[1]}.${plantedBomb[0] + i}`
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
    (function displayRadiusY() {
      //Yay my 2nd IIFE !! it displays the bomb radius on the vertical axe
      for (let i = -bombP1Radius; i <= bombP1Radius; i++) {
        position = document.getElementById(
          `${plantedBomb[1] + i}.${plantedBomb[0]}`
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
