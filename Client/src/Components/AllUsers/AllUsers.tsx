import Conversation from '../Conversation-box/Conversation'
import './AllUsers.css'
import logo from '../../assets/Generate A Logo Named KK .its For A Social Media .png'
import settings from '../../assets/icons8-settings-64.png'
import { useEffect, useState } from 'react'
const AllUsers = ({chats}) => {
  const [state,setState]=useState<[]>([])
  let idFilter=new Set()
  console.log(chats);
  useEffect(()=>{
    
    let newdata=chats.filter((val)=>{
      if (myId===val.receiverId && !idFilter.has(val.senderId)) {
        idFilter.add(val.senderId)
        console.log(val.senderId);
        
        return true 
      } 
      return false
    }) 
setState(newdata)
return ()=>{ 
  state 
} 
    },[])
  let myId=1
  return (
    <div className='allusers-container'>
      <div className="users-headding">
        <div className="app-logo">
          <img src={logo} alt="applogo" />
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
          <img src={settings} alt="settings" />
        </div>
        </div> 
        <div className="conversation-box">
          {
            state.map((val,i)=>(
             
              <Conversation  data={val} />
            ))
          }
        
         
      </div>
    </div>
  )
}

export default AllUsers
