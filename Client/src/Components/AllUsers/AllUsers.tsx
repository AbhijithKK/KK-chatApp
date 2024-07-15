import Conversation from "../Conversation-box/Conversation";
import "./AllUsers.css";
import logo from "../../assets/Generate A Logo Named KK .its For A Social Media .png";
import settings from "../../assets/icons8-settings-64.png";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import { allUserApi, createChatApi, fetchChatUserApi } from "../Utils/api";
import { allusers, selectData } from "../Utils/Interface";
interface AllUsersProps {
  chats: allusers[];
  refresh:(a:boolean)=>{}
  refreshV:boolean
}

const AllUsers: React.FC<AllUsersProps> = ({ chats,refresh ,refreshV}) => {
  
  const [state, setState] = useState<[]>([]);
  const [isOpen, setIsclose] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchUsers, setSerchUsers] = useState<[]>([]);

  const closeFnc = (f: boolean) => {
    setIsclose(f);
    setSearch('')
  };


  const searchHelper=async(e:any)=>{
    setIsclose(true);
    setSearch(e?.target?.value);
    const data=await allUserApi(search)
    setSerchUsers(data.data)
  }


const selectUser=async(userdata:selectData)=>{
  // search to create user
 await createChatApi(userdata?.userId)
  setIsclose(false)
  refresh(refreshV)
}
 
  useEffect(() => {
  const userDataFetcher=async()=>{
    const data=await fetchChatUserApi(chats)
    if (!data.error) {
      setState(data.data)
    }
  }
    userDataFetcher()
  }, [chats,refresh]);
  
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
          state.map((val, i) => <Conversation status={true} key={i} data={val} />)
        )}
      </div>
      {isOpen &&
        createPortal(<Modal headding={'All users'}
        content={ 
          searchUsers.map((val, i) =>      <div key={i} onClick={()=>selectUser(val)} className="modal-conversation-box"> <Conversation status={false}  data={val} /> </div>)
      } 
        closeFnc={closeFnc} />, document.body)}
    </div>
  );
};

export default AllUsers;
