import { useEffect } from "react"
import ChatHeadding from "../ChatWindowComponents/ChatHeadding/ChatHeadding"
import ChatSpace from "../ChatWindowComponents/ChatSpace/ChatSpace"
import InputSection from "../ChatWindowComponents/InputSection/InputSection"
import { singleUserInterface } from "../Utils/Interface"
import './ChatWindow.css'
import { getChatApi } from "../Utils/api"
const   ChatWindow = (chat:singleUserInterface) => {
  console.log(chat);
  useEffect(()=>{
    const apiHelper=async()=>{
      const data=await getChatApi(chat._id)
    }
  },[])
  return (
    <div className='chat-window-container'>
     {/* <ChatHeadding chat={chat} /> */}
     <div className="chatwindow-middle">
    {/* {
      chat.map((val,i)=>(
        
        <ChatSpace chat={val} />
      ))
    } */}
     
     </div>
      <InputSection/>
          </div>
  )
}

export default ChatWindow
