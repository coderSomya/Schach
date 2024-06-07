import React from 'react';
import chessboard from "../assets/chessboard.jpeg"
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  
  const navigate = useNavigate();
  return (
    <div className='flex justify-center h-screen w-screen items-center gap-4 bg-slate-900'>
        <div className='w-80 shadow-lg border border-white-2px'>
            <img src={chessboard} alt="" />
        </div>
        <div className='text-white text-2xl font-bold flex flex-col gap-3'>
            <center>Chess platform for Rebalance Technologies..</center>
            <button onClick={()=>{
                navigate("/game");
            }}className='mx-auto py-2 w-1/2 shadow-xl hover:scale-[1.1] bg-green-500'>Play</button>
        </div>
    </div>
  )
}

export default Landing