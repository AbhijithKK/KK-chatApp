import Conversation from "../Conversation-box/Conversation";
import "./AllUsers.css";
import logOut from '../../assets/icons8-logout-50.png'
import logo from "../../assets/Generate A Logo Named KK .its For A Social Media .png";
import settings from "../../assets/icons8-settings-64.png";
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import { allUserApi, createChatApi, fetchChatUserApi } from "../Utils/api";
import { allusers, selectData, singleUserInterface } from "../Utils/Interface";
import { useSelector } from "react-redux";
import { RootState } from "../Utils/Redux/Store";
import '../Utils/Common.css'
import demoimg from '../../assets/icons8-test-account-48.png'
interface AllUsersProps {
  chats: allusers[];
  refresh:Dispatch<SetStateAction<boolean>>;
  refreshV:boolean
  chatSelector:(data: singleUserInterface,i:number) => void;
  chatIndex:number|null
}

const AllUsers: React.FC<AllUsersProps> = ({ chats,refresh ,refreshV,chatSelector,chatIndex}) => {
  
  const [state, setState] = useState<[]>([]);
  const [isOpen, setIsclose] = useState<boolean>(false);
  const [settingsOpen, setSettings] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchUsers, setSerchUsers] = useState<[]>([]);
  
// modal close fnc
  const closeFnc = (f: boolean) => {
    setIsclose(f);
    setSearch('')
  };

// input search onchange fnc
  const searchHelper=async(e:any)=>{
    setIsclose(true);
    setSearch(e?.target?.value);
    const data=await allUserApi(search)
    setSerchUsers(data.data)
    refresh(!refreshV)


  }


  // search to create user
const selectUser=async(userdata:selectData)=>{  
 let data=await createChatApi(userdata?.userId)
 console.log(data);
 
  setIsclose(false)
  refresh(!refreshV)
  setSearch('')
  


}

const [onlineIds,setOnlineIds]=useState<[]>([])
const { socket } = useSelector((state: RootState) => state.socketData);
const { image,name,userId } = useSelector((state: RootState) => state.userData);
const [updateName,setUpdateName]=useState<string>('')
const [updateImage,setUpdateImage]=useState<any|null>(null)
const [previewImage,setPriviewImage]=useState<any>(null)
  useEffect(() => {
    if (socket) {
      socket?.on("onlineusers", (msg) => {
        setOnlineIds(msg)
      });
    }
    return () => {
      socket?.off("onlineusers");
    };
  }, [socket, chatIndex]);
//  fetch all user data
const memoizedChats = useMemo(() => chats, [chats]);
useEffect(() => {
  const userDataFetcher = async () => {
    const data = await fetchChatUserApi(memoizedChats);
    if (!data.error) {
      const updatedData=data.data.map((val:any)=>{
        let status=false
        for (const onlineId of onlineIds ) {
          if (val._id==onlineId) {
            status=true
          }
        }
        return{...val,status:status}
      })
      setState(updatedData);
    }
  };
  userDataFetcher();
}, [memoizedChats, refreshV,socket]);
useEffect(()=>{
  setUpdateName(name)
  setUpdateImage(image)
},[settingsOpen])
const handleUpdate=async()=>{
if (updateName.trim()) {
  
}
}
const handleImageChange=(e:any)=>{
  setUpdateImage(e.target.files[0])
 const previewUrl=URL.createObjectURL(e.target.files[0])
  setPriviewImage(previewUrl)
}
  return (
    <div className="allusers-container">
      <div className="users-headding">
        <div className="app-logo" title="Settings">
          <img  src={image?image:logo} alt="applogo" />
        </div>
        <div className="app-name">
          <p>{name}</p>
          <img src={logOut} alt="logout" />
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
          <img onClick={()=>setSettings(true)} src={settings} alt="settings"  />
        </div>
      </div>
      <div className="conversation-box">
        {chats.length == 0 ? (
          <div style={{textAlign:"center",color:"white"}}> Search and find your friends</div>
        ) : (
          state.map((val, i) =>
          
           <Conversation  
           key={i}
           chatSelector={chatSelector} 
           status={true}  data={val} index={i}
           chatIndex={chatIndex}
           />
          
           )
        )}
      </div>
      {isOpen &&
        createPortal(<Modal headding={'All users'}
        content={ 
          searchUsers.map((val, i) =>     
           <div key={i} onClick={()=>selectUser(val)} 
           className="modal-conversation-box"> 
          <Conversation status={false} data={val} 
          chatSelector={()=>{}}
          index={i} chatIndex={null}   /> </div>)
      } 
        closeFnc={closeFnc} />, document.body)}
        {
          settingsOpen&&
          createPortal(<Modal headding={'Settings'}
          content={<div>
            <input className="update-input" type="text" value={updateName} onChange={(e)=>setUpdateName(e.target.value)} />
            <div className="update-image">

            <img src={previewImage?previewImage:demoimg} alt="demo" style={{width:"20%"}} />
            <input type="file" 
             onChange={handleImageChange }/>
            </div>
            
            <button className="update-btn" type="button" onClick={handleUpdate}>update</button>
          </div> } closeFnc={setSettings}/>,document.body )
        }
    </div>
  );
};

export default AllUsers;
