import { useState, useEffect } from 'react';
import './LandingPage.css';
import { io, Socket } from 'socket.io-client';
import AllUsers from '../AllUsers/AllUsers';
import ChatWindow from '../ChatWindow/ChatWindow';

const LandingPage = () => {
  const [message, setMessage] = useState<string>('');
  const [receivedMessage, setReceivedMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat,setChat]=useState<[]>([])
  let arr=[
    {
    senderId:1,
    receiverId:2,
    name:'abhijith',
    status:true,
    message:'haiii',

  },
    {
    senderId:2,
    receiverId:1,
    name:'abhi',
    status:true,
    message:'hloo',

  },
    {
    senderId:1,
    receiverId:2,
    name:'abhijith',
    status:true,
    message:'where',

  },
    {
    senderId:2,
    receiverId:1,
    name:'abhi',
    status:true,
    message:'here',

  },
]
  useEffect(() => {
    setChat(arr)
    const newSocket = io(import.meta.env.VITE_SOCKET_URL);

    newSocket.on('get', (msg: string) => {
      setReceivedMessage(msg);
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
      socket.emit('post', message);
    }
  };

  return (
    <div className="landing-page">
      <div className="left-side">
        <AllUsers/>
        
      </div>
      <div className="right-side">
        <ChatWindow chat={chat} />
      </div>
    </div>
  );
};

export default LandingPage;
