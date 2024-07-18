import { useState, useEffect } from "react";
import "./LandingPage.css";
import { io, Socket } from "socket.io-client";
import AllUsers from "../AllUsers/AllUsers";
import ChatWindow from "../ChatWindow/ChatWindow";
import { homeApi } from "../Utils/api";
import { allusers, singleUserInterface } from "../Utils/Interface";
import { useDispatch, useSelector } from "react-redux";
import { socketUpdate } from "../Utils/Redux/Reducers";
import { RootState } from "../Utils/Redux/Store";

const LandingPage = () => {
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [allUsers, setAllusers] = useState<allusers[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [singleChat, setSingleChat] = useState<singleUserInterface>({
    name: "",
    _id: "",
    image: "",
    status: false,
  });
  const dispatch=useDispatch()
  const userId:string=useSelector((state:RootState)=>state.userData.userId)
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL);
    newSocket.emit("register",userId)
    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    dispatch(socketUpdate(socket));
  }, [socket, dispatch]);
  
  useEffect(() => {
    const apiFetch = async () => {
      const data = await homeApi();
      if (!data?.error) {
        setAllusers(data?.data);
      } else {
      }
    };
    apiFetch();
  }, [refresh]);
  const chatSelector = (data: singleUserInterface): void => {
    setSingleChat(data);
  };


  

  return (
    <div className="landing-page">
      <div className="left-side">
        <AllUsers
          chatSelector={chatSelector}
          chats={allUsers}
          refresh={setRefresh}
          refreshV={refresh}
        />
      </div>
      <div className="right-side">
        <ChatWindow refresh={refresh} chat={singleChat} />
      </div>
    </div>
  );
};

export default LandingPage;
