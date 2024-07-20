import "./InputSection.css";
import sendbtn from "../../../assets/icons8-send-button-100.png";
import filepicer from "../../../assets/icons8-add-file-50.png";
import {  useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Utils/Redux/Store";
import { postChatTextApi } from "../../Utils/api";
import { MembersData } from "../../ChatWindow/ChatWindow";
import '../../Utils/Common.css'
interface inputSection {
  membersData: MembersData;
  setMsgSnt: (data: boolean) => void;
  msgSnt: boolean;
}
const InputSection: React.FC<inputSection> = ({
  membersData,
  setMsgSnt,
  msgSnt,
}) => {
  const {socket}=useSelector((state:RootState)=>state.socketData)

  const [message, setMessage] = useState<string>("");
  const senderId = useSelector((state: RootState) => state.userData.userId);
 
  
 
    const sendMessage = async () => {
      let receiverId=membersData.members.find((val)=>val!=senderId)
      if (membersData._id && message.trim()) {
        if (socket) {
        console.log('sss',socket);
        
            socket.emit('post',{chatId:membersData._id, senderId, message,receiverId})
          }
         await postChatTextApi(membersData._id, senderId, message);
        setMsgSnt(!msgSnt);
        setMessage("");
      }
    };
  
 
  return (
    <div className="input-section-container">
      <div className="media-picker">
        <img src={filepicer} alt="mediapicker" />
      </div>
      <div className="input-box">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          name=""
          id=""
        ></textarea>
      </div>
      <div className="send-btn">
        <button onClick={sendMessage}>
          <img src={sendbtn} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default InputSection;
