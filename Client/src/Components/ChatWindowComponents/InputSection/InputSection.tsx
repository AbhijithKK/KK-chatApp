import "./InputSection.css";
import sendbtn from "../../../assets/icons8-send-button-100.png";
import filepicer from "../../../assets/icons8-add-file-50.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Utils/Redux/Store";
import { postChatTextApi } from "../../Utils/api";
interface inputSection {
  chatId: string;
  setMsgSnt: (data: boolean) => void;
  msgSnt: boolean;
}
const InputSection: React.FC<inputSection> = ({
  chatId,
  setMsgSnt,
  msgSnt,
}) => {
  const [message, setMessage] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.userData.userId);
  const sendMessage = async () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    const sendMessage = async () => {
      if (chatId && message.trim()) {
         await postChatTextApi(chatId, userId, message);
        setMsgSnt(!msgSnt);
        setMessage("");
      }
    };
    sendMessage();
  }, [chatId, refresh]);
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
