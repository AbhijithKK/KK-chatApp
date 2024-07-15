import { useState, useEffect } from 'react';
import './LandingPage.css';
import { io, Socket } from 'socket.io-client';
import AllUsers from '../AllUsers/AllUsers';
import ChatWindow from '../ChatWindow/ChatWindow';
import { homeApi } from '../Utils/api';

const LandingPage = () => {
 
  const newSocket = io(import.meta.env.VITE_SOCKET_URL);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [allUsers,setAllusers]=useState<[]>([])
useEffect(()=>{
const apiFetch=async()=>{
  const data=await homeApi()
  if (!data?.error) {
    setAllusers(data?.data)
  }else{

  }
  
}
apiFetch()
},[])




  
let arr=[]

  useEffect(() => {
    

    newSocket.on('get', (msg: string) => {
     
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('post', );
    }
  };

  return (
    <div className="landing-page">
      <div className="left-side">
        <AllUsers chats={allUsers} />
         
        
      </div>
      <div className="right-side">
        <ChatWindow chat={arr} />
      </div>
    </div>
  );
};

export default LandingPage;
