import { Chess} from "chess.js";
import { WebSocket } from "ws";

export class Game {
    
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
    }


    makemove(socket: WebSocket, message: string){
        //validation 

        //is it THIS user's move?

        //is the move valid?

        //push the move
        //update the board
        //check if the game is over

        //send the updated board to both the players

    }
}