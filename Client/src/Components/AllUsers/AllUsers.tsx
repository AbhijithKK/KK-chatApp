import Conversation from '../Conversation-box/Conversation'
import './AllUsers.css'

const AllUsers = () => {
  return (
    <div className='allusers-container'>
      <div className="users-headding">
        <div className="app-logo">
          <img src="" alt="applogo" />
        </div>
        <div className="app-name">
          <p>KK-Chatapp</p>
        </div>
        </div>
        <div className="usersblock-second-section">

        <div className="search-people">
          <input type="search" placeholder='search here...' />

        </div>
        <div className="settigs">
          <img src="" alt="settings" />
        </div>
        </div>
        <div className="conversation-box">
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
      </div>
    </div>
  )
}

export default AllUsers
