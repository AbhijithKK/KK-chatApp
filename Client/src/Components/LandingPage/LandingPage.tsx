import { useState, useEffect } from 'react';
import './LandingPage.css';
import { io, Socket } from 'socket.io-client';

const LandingPage = () => {
  const [message, setMessage] = useState<string>('');
  const [receivedMessage, setReceivedMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
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

      </div>
      <div className="right-side">
        
      </div>
    </div>
  );
};

export default LandingPage;
