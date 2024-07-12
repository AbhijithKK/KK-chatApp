import './ChatHeadding.css'
import backbtn from '../../../assets/icons8-back-button-50.png'
import dummypro from '../../../assets/icons8-test-account-48.png'
import optionsicon from '../../../assets/icons8-menu-button-30.png'
const ChatHeadding = () => {
  return (
    <div className='chatheadding-container'>
      <div className="profile-pic">
        <img src={backbtn} alt="backbtn" />
        <img src={dummypro} alt="propic" />
      </div>
      <div className="profile-name">
        <p>name</p>
        <p>status</p>
      </div>
      <div className="profile-options">
        <img src={optionsicon} alt="options" />
      </div>
    </div>
  )
}

export default ChatHeadding
