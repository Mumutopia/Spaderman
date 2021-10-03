import { board } from "./board.js";
export class Player {
    constructor(x,y,score,bombs,name){
        this.xPosition = x;
        this.yPosition = y;
        this.score = score;
        this.bomb = bombs;
        this.name = name;
    }

    startingPosition (){
        this.xPosition =0;
        this.yPosition =0;
    }

    movingUp(){
        this.yPosition +=1;
    }

    movingDown(){
        this.yPosition -=1;
    }

    movingLeft(){
        this.xPosition -=1;
    }

    movingRight(){
        this.xPosition +=1;
    }

    // canMove(){
    //     if (((this.xPosition > -1) && (this.yPosition > -1))&&((this.xPosition < board.length) && (this.yPosition < board.length))) {
    //         return true;
    //     }else return false;
    // }

    dig(){

    }

    plantBomb (){
        
    }   
}