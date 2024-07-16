import { useEffect } from "react"
import ChatHeadding from "../ChatWindowComponents/ChatHeadding/ChatHeadding"
import ChatSpace from "../ChatWindowComponents/ChatSpace/ChatSpace"
import InputSection from "../ChatWindowComponents/InputSection/InputSection"
import { singleUserInterface } from "../Utils/Interface"
import './ChatWindow.css'
const   ChatWindow = (chat:singleUserInterface) => {
  console.log(chat);
  useEffect(()=>{
    
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
