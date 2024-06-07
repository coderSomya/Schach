import React, {useState, useEffect} from 'react';
import Chessboard from "../components/Chessboard";
import {INIT_GAME, MOVE, GAME_OVER} from "../utils/constants.ts";
import {Chess} from "chess.js";
import {useSocket} from "../hooks/useSocket";


const Game: React.FC= () => {
    const [started, setStarted] = useState(false);
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    const handlePlay = ()=>{
        socket.emit(JSON.stringify({
            type: INIT_GAME
        }))
    }

    useEffect(()=>{
        if(!socket) return;

        socket.onmessage = (event: any)=>{
            const message = JSON.parse(event.data);

            switch(message.type){
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    break;
                case MOVE:
                    const move = message.payload;
                    console.log(move);
                    chess.move(move);
                    setBoard(chess.board());
                    break;

                case GAME_OVER:
                    break;
            }
        }
    },[socket])

    if(!socket) return <div>Connecting....</div>
  return (
    <div className="w-full h-screen flex mx-[5%]">
        <div className="w-[70%] bg-gray-900">
            <Chessboard board={board}/>
        </div>
        <div className="w-[20%] flex justify-center items-center bg-gray-900">{
            started ? 
            <button className="w-20 h-20 p-5 bg-green-500 text-white text-2xl font-bold ">
            End
        </button> : 
                    <button className="w-20 h-20 p-5 bg-green-500 text-white text-2xl font-bold " onClick={handlePlay}>
                    Play
                </button>
            }
        </div>
    </div>
  )
}

export default Game 