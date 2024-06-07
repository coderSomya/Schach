import { Chess} from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;
    private movecnt = 0;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));

        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }


    makemove(socket: WebSocket, move: {
        from: string,
        to: string
    }){
        //validation
        //is it THIS user's move?

        //is the move valid?
        if(this.movecnt %2 ===0 && socket!==this.player1){
            return;
        }
        if(this.movecnt %2!==0 && socket!==this.player2){
            return;
        }

        //push the move
        //update the board

        try{
            this.board.move(move)
        }catch(e){
            console.log("could not make move");
            return;
        }


        //check if the game is over
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: this.board.turn() === "w" ? "black": "white",
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: this.board.turn() === "w" ? "black": "white",
            }));
            return;
        }

        if(this.movecnt%2 ===0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        } else {
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
        this.movecnt++;
        //send the updated board to both the players

    }
}


/*

{
  "type": "move",
 "move": {
   "from": "e2",
   "to": "e4"
} 
}

*/