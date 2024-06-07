import React from 'react';
import {Square, PieceSymbol, Color} from "chess.js";

interface boardProps
{
    square: Square;
    type: PieceSymbol;
    color: Color;
} 

const Chessboard= ({board}: {board :(
boardProps | null)[][]
}) => {
  return (
    <div className="w-full">
        {board.map((row, i)=>{
            return( 
            <div key={i}>
                {
                  row.map((square, j)=>{
                    return <div key={j} className={`w-8 h-8 ${square ? 'bg-green-500': 'bg-green-300'}`}>{square ? square.type : ""}</div>
                })
            }
            </div>)
        })}
    </div>
  )
}

export default Chessboard; 