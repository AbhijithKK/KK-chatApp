import ChatHeadding from "../ChatWindowComponents/ChatHeadding/ChatHeadding"
import ChatSpace from "../ChatWindowComponents/ChatSpace/ChatSpace"
import InputSection from "../ChatWindowComponents/InputSection/InputSection"
import './ChatWindow.css'
const ChatWindow = () => {
  return (
    <div className='chat-window-container'>
     <ChatHeadding/>
     <ChatSpace/>
      <InputSection/>
          </div>
  )
}

export default ChatWindow
