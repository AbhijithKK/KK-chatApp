import "./Conversation.css";
import proicon from "../../assets/icons8-test-account-48.png";
import { conversationInterface } from "../Utils/Interface";
import { RootState } from "../Utils/Redux/Store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Conversation = ({
  data,
  status,
  chatSelector,
  index,
  chatIndex,
}: conversationInterface) => {
  // const { socket } = useSelector((state: RootState) => state.socketData);
  // useEffect(() => {
  //   if (socket) {
  //     socket?.on("onlineusers", (msg) => {
  //       const id=msg.find((val:string)=>val===data._id)
  //       if (id) {
  //         data.status=true
  //       }else{
  //         data.status=false
  //       }
  //     });
  //   }
  //   return () => {
  //     socket?.off("onlineusers");
  //   };
  // }, [socket, chatIndex]);
  console.log('conv',data);
  
  return (
    <div
      onClick={() => chatSelector(data, index)}
      className={
        index === chatIndex
          ? "conversation-container-select"
          : "conversation-container"
      }
    >
      <div className="conversation-left">
        <img src={data?.image ? data?.image : proicon} alt="logo" />
      </div>
      <div className="conversation-right">
        <div className="conversation-name">
          <p>{data?.name}</p>
        </div>
        <div className="conversaton-status">
          {status && <p>{data?.status ? "online" : "ofline"}</p>}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
