import Conversation from "../Conversation-box/Conversation";
import "./AllUsers.css";
import logo from "../../assets/Generate A Logo Named KK .its For A Social Media .png";
import settings from "../../assets/icons8-settings-64.png";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import { allUserApi } from "../Utils/api";
const AllUsers = ({ chats }) => {
  const [state, setState] = useState<[]>([]);
  const [isOpen, setIsclose] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchUsers, seSerchUsers] = useState<[]>([]);

  const closeFnc = (f: boolean) => {
    setIsclose(f);
    setSearch('')
  };
  const searchHelper=async(e:any)=>{
    setIsclose(true);
    setSearch(e?.target?.value);
    const data=await allUserApi(search)
    seSerchUsers(data.data)
  }

  let idFilter = new Set();
  useEffect(() => {
    let newdata = chats.filter((val) => {
      if (myId === val.receiverId) {
        idFilter.add(val.receiverId);
      }
      if (myId === val.senderId) {
        idFilter.add(val.senderId);
      }
      if (myId == val.senderId && idFilter.has(val.senderId)) {
        //  idFilter.delete(val.senderId)
        return true;
      }
      if (myId == val.receverId && idFilter.has(val.receiverId)) {
        //  idFilter.delete(val.receiverId)
        return true;
      }

      return false;
    });
    setState(newdata);
    return () => {
      state;
    };
  }, [chats]);
  let myId = 1;
  return (
    <div className="allusers-container">
      <div className="users-headding">
        <div className="app-logo">
          <img src={logo} alt="applogo" />
        </div>
        <div className="app-name">
          <p>KK-Chatapp</p>
        </div>
      </div>
      <div className="usersblock-second-section">
        <div className="search-people">
          <input
            value={search}
            type="search"
            onChange={searchHelper}
            placeholder="search here..."
          />
        </div>
        <div className="settigs">
          <img src={settings} alt="settings" />
        </div>
      </div>
      <div className="conversation-box">
        {chats.length == 0 ? (
          <div> Search and find your friends</div>
        ) : (
          state.map((val, i) => <Conversation key={i} data={val} />)
        )}
      </div>
      {isOpen &&
        createPortal(<Modal 
        content={ searchUsers.map((val, i) => <Conversation key={i} data={val} />)
      } 
        closeFnc={closeFnc} />, document.body)}
    </div>
  );
};

export default AllUsers;
