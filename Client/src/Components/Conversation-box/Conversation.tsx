import "./Conversation.css";
import proicon from "../../assets/icons8-test-account-48.png";
import { conversationInterface } from "../Utils/Interface";

const Conversation = ({
  data,
  status,
  chatSelector,
  index,
  chatIndex,
}: conversationInterface) => {
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
        <img
          src={
            data?.image
              ? import.meta.env.VITE_BASE_URL + "/images/" + data?.image
              : proicon
          }
          alt="logo"
        />
      </div>
      <div className="conversation-right">
        <div className="conversation-name">
          <p>{data?.name}</p>
        </div>
        <div
          className={
            data.status ? "conversaton-status-on" : "conversaton-status-off"
          }
        >
          {status && <p>{data?.status ? "online" : "ofline"}</p>}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
