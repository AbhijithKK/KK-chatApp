import { useEffect, useState } from "react"
import ChatHeadding from "../ChatWindowComponents/ChatHeadding/ChatHeadding"
import ChatSpace from "../ChatWindowComponents/ChatSpace/ChatSpace"
import InputSection from "../ChatWindowComponents/InputSection/InputSection"
import { singleUserInterface } from "../Utils/Interface"
import './ChatWindow.css'
import { getChatApi, getChatTextApi } from "../Utils/api"
interface chatText{
  senderId:string
  chatId:string
  message:string
  updatedAt:string
  createdAt:string
}
const   ChatWindow = (chat:singleUserInterface) => {
  const [chatText,setChatText]=useState<[chatText]>([
    {
      senderId:'',
  chatId:'',
  message:'',
  updatedAt:'',
  createdAt:'',
    }
  ])
  console.log(chat);
  useEffect(()=>{
    const apiHelper=async()=>{
      const data=await getChatApi(chat._id)
      if (!data.error) {
        const result=await getChatTextApi(data.data._id)
        if (!result.error) {
          setChatText(result.data)
        }
      }
    }
    apiHelper()
  },[])
  return (
    <div className='chat-window-container'>
     <ChatHeadding chat={chat} />
     <div className="chatwindow-middle">
    {chatText.length ?
      chatText.map((val,i)=>(
        
        <ChatSpace key={i} chat={val} />
      ))
      :<div>Send message to start conversation</div>
    }
     
     </div>
      <InputSection/>
          </div>
  )
}

export default ChatWindow
