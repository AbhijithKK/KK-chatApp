import { useEffect, useState } from "react"
import ChatHeadding from "../ChatWindowComponents/ChatHeadding/ChatHeadding"
import ChatSpace from "../ChatWindowComponents/ChatSpace/ChatSpace"
import InputSection from "../ChatWindowComponents/InputSection/InputSection"
import { chatText, singleUserInterface } from "../Utils/Interface"
import './ChatWindow.css'
import { getChatApi, getChatTextApi } from "../Utils/api"
interface chatWindow{
  chat:singleUserInterface
  refresh:boolean
}
const   ChatWindow = ({chat,refresh}:chatWindow) => {
  const [chatText,setChatText]=useState<[chatText]>([
    {
      senderId:'',
  chatId:'',
  message:'',
  updatedAt:'',
  createdAt:'',
    }
  ])
  const[getTextId,setGetTextId]=useState<string>('')
  useEffect(()=>{
    const apiHelper=async()=>{
      if (chat) {
        
        const data=await getChatApi(chat._id)
        if (!data.error) {
         setGetTextId(data?.data?._id)
        }
      }
    }
    apiHelper()
  },[refresh])
  useEffect(()=>{
    const apiHelper=async()=>{
          const result=await getChatTextApi(getTextId)
          if (!result.error) {
            setChatText(result.data)
          }
    }
    apiHelper()
  },[getTextId,refresh])
  
  return (
    <div className='chat-window-container'>
     <ChatHeadding chat={chat} />
     <div className="chatwindow-middle">
    {!chatText.length ?
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
