import './ChatSpace.css'

const ChatSpace = ({chat}) => {
  
  let myid=1
  return (
    <div className='chat-space-container'>
      {
        chat.senderId!==myid ?
      
      <div className="receive-message">
       <p>{chat.message}</p>
      </div>
      :
      <div className="send-message">
       <p> {chat.message}</p>
      </div>
}
    </div>
  )
}

export default ChatSpace
