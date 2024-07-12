import './Conversation.css'
import proicon from '../../assets/icons8-test-account-48.png'
const Conversation = () => {
  return (
    <div className='conversation-container'>
      
    <div className="conversation-left">
        <img src={proicon} alt="logo" />
    </div>
    <div className="conversation-right">
    <div className="conversation-name">
        <p>name</p>
    </div>
    <div className="conversaton-status">
        <p>online</p>
    </div>
    </div>
    </div>
  )
}

export default Conversation
