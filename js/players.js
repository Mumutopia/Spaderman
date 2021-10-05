import { board } from "./board.js";
export class Player {
    constructor(x,y,score,bombs,name){
        this.xPosition = x;
        this.yPosition = y;
        this.score = score;
        this.bomb = bombs;
        this.name = name;
        this.busy = false;
    }

    startingPosition (){
        this.xPosition =0;
        this.yPosition =0;
    }

    movingUp(){
        this.yPosition -=1;
    }

    movingDown(){
        this.yPosition +=1;
    }

    movingLeft(){
        this.xPosition -=1;
    }

    movingRight(){
        this.xPosition +=1;
    }

    isBusy(){//this will prevent the player to move while digging
        this.busy =true;
        setTimeout(() => {this.busy = false},1000);
        return this.busy;
    }

    dig(position){
        
        switch (board[this.yPosition][this.xPosition]) {
            case "R":
                this.score+=100;
                board[this.yPosition][this.xPosition] ="E";
                position.classList.add("dug");
                break;
            case "BR":
                this.score+=200;
                board[this.yPosition][this.xPosition] ="E"
                position.classList.add("dug");
                break;
            case "GR":
                this.score+=500;
                board[this.yPosition][this.xPosition] ="E"
                position.classList.add("dug");
                break;
            case "B":
                this.bomb +=5;
                board[this.yPosition][this.xPosition] ="E"
                position.classList.add("dug");
                break;
            default:
                board[this.yPosition][this.xPosition] ="E"
                position.classList.add("dug");
                break;
        }
    }

    actualPosition (position,name){
        if (position !== null) {
            position.classList.add(`${name}-board`);
        }
        
    }

    formerPosition (position,name) {
        if (position !== null) {
            position.classList.remove(`${name}-board`);
        }
        
    }

    plantBomb (){
        if (this.bomb > 0) {
            const plantedBomb = [this.yPosition,this.xPosition]
            
        }
    }   
}