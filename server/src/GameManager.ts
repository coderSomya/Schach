import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {

    private games :Game[];
    private pendingUser: WebSocket | null;

    constructor(){
        this.games = [];
        this.pendingUser = null;
    }

    addUser(socket: WebSocket){
    }

    removeUser(socket: WebSocket){
    }

    private handleMessage(socket: WebSocket){
        socket.on('message', (data)=>{
            const message = JSON.parse(data.toString());

            switch(message.type){
                case INIT_GAME:
                    if(this.pendingUser){
                        //start the game
                        const game = new Game(this.pendingUser, socket);
                        this.games.push(game);
                        this.pendingUser = null;
                    }
                    else{
                        this.pendingUser = socket;
                    }
                    break;

                case MOVE:
                    const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);

                    if(game) game.makemove(socket, message.move)
                    break;
            }
        })
    }
}