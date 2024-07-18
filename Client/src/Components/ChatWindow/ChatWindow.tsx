import { useEffect, useState } from "react"
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
  const [chatText,setChatText]=useState<chatText[]>([
    {
      senderId:'',
  chatId:'',
  message:'',
  updatedAt:'',
  createdAt:'',
    }
  ])
  const [msgSnt,setMsgSnt]=useState<boolean>(false)
  const [refresher,setRefresher]=useState<boolean>(false)

  const [getTextId, setGetTextId] = useState<MembersData>({
    _id: '',
    members: ['', '']
  });
  useEffect(()=>{
    const apiHelper=async()=>{
      if (chat?._id) {
        
          
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
      if (getTextId) {
        
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
  
  // const [receivedMessage,setReceivedMessage]=useState<chatText[]>(chatText)
  useEffect(()=>{
if (socket) {
socket.on("get",(msg:chatText)=>{
    console.log('sockr,msg',msg);
    
    setChatText((prev)=>{
     return  [...prev,msg]
    })
  })
}
  },[chatText])
  
  return (
    <div className='chat-window-container'>
     <ChatHeadding chat={chat} />
     <div className="chatwindow-middle">
    {chatText.length?
      chatText?.map((val,i)=>(
        
        <ChatSpace key={i} chat={val} />
      ))
      :<div>Send message to start conversation</div>
    }
     
     </div>
      <InputSection msgSnt={msgSnt} setMsgSnt={setMsgSnt} membersData={getTextId}/>

          </div>
  )
}

export default ChatWindow
