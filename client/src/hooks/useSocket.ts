import {useState, useEffect} from "react";
// import {WebSocket} from 'ws';

const WS_URL = 'ws://localhost:8080';

export const useSocket = ()=> {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);

        ws.onopen =()=>{
            setSocket(ws);       
            ws.onmessage = (msg)=>{
                console.log(msg);
            }
        }

        ws.onclose = ()=>{
            setSocket(null);
        }


        return () =>{
            ws.close();
        }
    },[])

    return socket;
}