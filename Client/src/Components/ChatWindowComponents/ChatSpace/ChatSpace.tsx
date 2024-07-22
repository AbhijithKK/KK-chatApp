import { useSelector } from "react-redux";
import { chatText } from "../../Utils/Interface";
import "./ChatSpace.css";
import { RootState } from "../../Utils/Redux/Store";
interface chatSpace {
  chat: chatText;
}
const ChatSpace = ({ chat }: chatSpace) => {
  const selector = useSelector((state: RootState) => state.userData);

  return (
    <div className="chat-space-container">
      {chat.senderId !== selector.userId ? (
        <div className="receive-message">
          <p>{chat.message}</p>
        </div>
      ) : (
        <div className="send-message">
          <p> {chat.message}</p>
        </div>
      )}
    </div>
  );
};

export default ChatSpace;
