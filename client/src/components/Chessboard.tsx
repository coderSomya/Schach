import React, { useState } from 'react';
import {Square, PieceSymbol, Color} from "chess.js";
import { useSocket } from '../hooks/useSocket';
import { getAsciiFromCoords } from '../utils/ascii';

interface boardProps
{
    square: Square;
    type: PieceSymbol;
    color: Color;
} 

const Chessboard= ({board, setBoard, chess, socket}: {board :(
boardProps | null)[][]; setBoard: any; chess: any;
socket: WebSocket;
}) => {

  const [to, setTo] = useState<Square | undefined>(undefined);
  const [from, setFrom] = useState<Square | undefined>(undefined);

  const handleMove = (square: Square | undefined)=>{
    if(!socket) return;
    console.log("clickec", square);
    if(!from){
      setFrom(square);
      console.log("set from to", from);
      return;
    }

    setTo(square);
    console.log("set to to", to);
  
    chess.move({
      from,to
    });


    setBoard(chess.board());
    socket.send(JSON.stringify({
      type: "move",
      payload:{
        move:{
          from,
          to
        }
      } 
    }));
    setFrom(undefined);

    console.log(from, to);

  }
  return (
    <div className ="w-full">
        {board.map((row, i)=>{
            return( 
            <div key={i} className='flex justify-center items-center'>
                {
                  row.map((square, j)=>{
                    const rep = getAsciiFromCoords(i,j) as Square;
                    return <div key={j} className={`w-[50px] h-[50px] border text-center font-bold hover: cursor-pointer shadow-lg border-rounded ${(i+j)%2 ? 'bg-green-500': 'bg-green-300'}`} onClick={()=>handleMove(rep)}>{square ? square.type : ""}</div>
                  })
                }
            </div>)
        })}
    </div>
  )
}

export default Chessboard; 