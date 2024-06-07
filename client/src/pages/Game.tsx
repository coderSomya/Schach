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
        if(!socket) return;

        socket.send
        (JSON.stringify({
            type: INIT_GAME
        }))
    };

    const handleExit = ()=>{
        socket?.send(JSON.stringify({
            type: GAME_OVER
        }))
        setStarted(false);
        setChess(new Chess());
        setBoard(chess.board());
    };

    useEffect(()=>{
        if(!socket) return;

        socket.onmessage = (event: any)=>{
            const message = JSON.parse(event.data);

            switch(message.type){
                case INIT_GAME:
                    setBoard(chess.board());
                    setStarted(true);
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
        <div className="w-[70%] flex items-center bg-gray-900">
            <Chessboard board={board} setBoard={setBoard} chess={chess}
            socket={socket}
            />
        </div>
        <div className="w-[20%] flex justify-center items-center bg-gray-900">{
            started ? 
            <button className="w-20 h-20 p-5 bg-green-500 text-white text-2xl font-bold rounded-lg"
            onClick={handleExit}
            >
            End
        </button> : 
                    <button className="w-20 h-20 p-5 bg-green-500 text-white text-2xl font-bold border  text-center rounded-lg" onClick={handlePlay}>
                    Play
                </button>
            }
        </div>
    </div>
  )
}

export default Game 