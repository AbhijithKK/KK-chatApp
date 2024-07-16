import "./Conversation.css";
import proicon from "../../assets/icons8-test-account-48.png";
import { conversationInterface } from "../Utils/Interface";

const Conversation = ({ data, status,chatSelector }: conversationInterface) => {
  return (
    <div onClick={()=>chatSelector(data)} className="conversation-container">
      <div className="conversation-left">
        <img src={data?.image ?data?.image:proicon} alt="logo" />
      </div>
      <div className="conversation-right">
        <div className="conversation-name">
          <p>{data.name}</p>
        </div>
        <div className="conversaton-status">
          {status && <p>{data.status ? "online" : "ofline"}</p>}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
