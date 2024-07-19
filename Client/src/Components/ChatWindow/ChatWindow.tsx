import { useEffect, useRef, useState } from "react"
import ChatHeadding from "../ChatWindowComponents/ChatHeadding/ChatHeadding"
import ChatSpace from "../ChatWindowComponents/ChatSpace/ChatSpace"
import InputSection from "../ChatWindowComponents/InputSection/InputSection"
import { chatText, singleUserInterface } from "../Utils/Interface"
import './ChatWindow.css'
import { getChatApi, getChatTextApi } from "../Utils/api"
import { useSelector } from "react-redux"
import { RootState } from "../Utils/Redux/Store"
interface chatWindow{
  chat:singleUserInterface
  refresh:boolean
}
export interface MembersData {
  _id: string;
  members: [string, string];
}

const   ChatWindow = ({chat,refresh}:chatWindow) => {
  const {socket}=useSelector((state:RootState)=>state.socketData)
  const [chatText,setChatText]=useState<chatText[]>([])
  const [msgSnt,setMsgSnt]=useState<boolean>(false)
  const [refresher,setRefresher]=useState<boolean>(false)

  const [getTextId, setGetTextId] = useState<MembersData>({
    _id: '',
    members: ['', '']
  });
  useEffect(()=>{
    const apiHelper=async()=>{
      if (chat?._id) {
        // get members array
          const data=await getChatApi(chat._id)
          if (!data.error) {
            setGetTextId(data?.data)
        }
      }
    }
    apiHelper()
  },[chat,refresh,msgSnt])
  useEffect(()=>{
    const apiHelper=async()=>{
      if (getTextId._id) {
        // get all chat data
        const result=await getChatTextApi(getTextId?._id)
        if (!result.error) {          
          setChatText(result.data)
        }
      }
    }
    apiHelper()
  },[getTextId,refresh,msgSnt])

  useEffect(()=>{
    if (chatText) {
      setRefresher(!refresher)
    }
  },[chatText])
  
  useEffect(()=>{
if (socket) {
socket.on("get",(msg:chatText)=>{
    console.log('sockr,msg',msg);
    
    setChatText([...chatText,msg])
  })
}
  },[chatText])
const scrollRef=useRef(null)  
useEffect(()=>{
  scrollRef?.current?.scrollIntoView({behavior:"smooth"})
},[chat,chatText]) 
  return (
    <div className='chat-window-container'>
      {
        getTextId._id
        ?
        <ChatHeadding chat={chat} />
        :''
      }
     <div className="chatwindow-middle">
    {chatText.length?
          chatText?.map((val,i)=>(
        getTextId._id===val.chatId ?
        <ChatSpace key={i} chat={val} />:''
      ))
      :<div className="empty-conv">(Send Message to Start Conversation)</div>
    }
     <div ref={scrollRef} ></div>
     </div>
     {
      getTextId._id
      ?
      <InputSection msgSnt={msgSnt} setMsgSnt={setMsgSnt} membersData={getTextId}/>
      :''
     }

          </div>
  )
}

export default ChatWindow
