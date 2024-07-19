import { useState, useEffect } from "react";
import "./LandingPage.css";
import { io, Socket } from "socket.io-client";
import AllUsers from "../AllUsers/AllUsers";
import ChatWindow from "../ChatWindow/ChatWindow";
import { homeApi, userDetailsApi } from "../Utils/api";
import { allusers, singleUserInterface } from "../Utils/Interface";
import { useDispatch, useSelector } from "react-redux";
import { socketUpdate, userUpdate } from "../Utils/Redux/Reducers";
import { RootState } from "../Utils/Redux/Store";
import { updateAuth } from "../Utils/Redux/AuthReducer";

const LandingPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [allUsers, setAllusers] = useState<allusers[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refreshSocket, setRefreshSocket] = useState<boolean>(false);
  const [chatIndex, setSelectedChatIndex] = useState<number|null>(null);
  const [singleChat, setSingleChat] = useState<singleUserInterface>({
    name: "",
    _id: "",
    image: "",
    status: false,
  });
  const { auth } = useSelector((state: RootState) => state.authData);
  const dispatch = useDispatch();

  const userId: string = useSelector(
    (state: RootState) => state.userData.userId
  );
  const newSocket = io(import.meta.env.VITE_SOCKET_URL);
  useEffect(() => {
    newSocket.emit("register", userId);

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [refreshSocket]);
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
  useEffect(() => {
    dispatch(updateAuth(!auth));
  }, []);
  const chatSelector = (data: singleUserInterface,i:number): void => {
    setSingleChat(data);
    setSelectedChatIndex(i)
    setRefreshSocket(!refreshSocket)
  };

  useEffect(() => {
    const apiHelper = async () => {
      const data = await userDetailsApi();
      if (!data.error) {
        const newData = {
          userId: data.data._id,
          name: data.name,
          image: data?.image,
        };
        dispatch(userUpdate(newData));
      }
    };
    apiHelper();
  }, []);

  return (
    <div className="landing-page">
      <div className="left-side">
        <AllUsers
          chatSelector={chatSelector}
          chats={allUsers}
          refresh={setRefresh}
          refreshV={refresh}
          chatIndex={chatIndex}
        />
      </div>
      <div className="right-side">
        <ChatWindow refresh={refresh} chat={singleChat} />
      </div>
    </div>
  );
};

export default LandingPage;
