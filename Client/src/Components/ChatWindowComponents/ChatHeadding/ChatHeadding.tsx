import './ChatHeadding.css'
import backbtn from '../../../assets/icons8-back-button-50.png'
import dummypro from '../../../assets/icons8-test-account-48.png'
import optionsicon from '../../../assets/icons8-menu-button-30.png'
import { singleUserInterface } from '../../Utils/Interface'
import '../../Utils/Common.css'
interface ChatComponentProps {
  chat: singleUserInterface;
  setMobileView:(a:boolean)=>void
}
const ChatHeadding:React.FC<ChatComponentProps> = ({chat,setMobileView}) => {

  return (
    <div className='chatheadding-container'>
      <div className="profile-pic">
        <img onClick={()=>setMobileView(false)} src={backbtn} alt="backbtn" />
        <img src={chat.image?import.meta.env.VITE_BASE_URL+'/images/'+chat?.image:dummypro} alt="propic" />
      </div>
      <div className="profile-name">
        
        <p>{chat.name}</p>
        <p>{chat.status?'online':'offline'}</p>
      </div>
      <div className="profile-options">
        <img src={optionsicon} alt="options" />
      </div>
    </div>
  )
}

export default ChatHeadding
