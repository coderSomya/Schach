import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {

    private games :Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
        this.handleMessage(socket);
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user=> user!==socket);

        //stop the game maybe?
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

                    if(game) game.makemove(socket, message.payload.move)
                    break;

                case GAME_OVER:
                    this.games = this.games.filter((game) => game.player1 !== socket && game.player2 !== socket);
                    break;
            }
        })
    }
}