import './ChatHeadding.css'
import backbtn from '../../../assets/icons8-back-button-50.png'
import dummypro from '../../../assets/icons8-test-account-48.png'
import optionsicon from '../../../assets/icons8-menu-button-30.png'
import { useEffect, useState } from 'react'
const ChatHeadding = ({chat}) => {
  let myid=1
  const [data,setData]=useState({name:'',status:false})
 useEffect(()=>{
  chat.forEach(val => {
    if ( val.senderId!==myid) {
     setData({name:val.name,status:val.status})
     
    }
   });
 },[chat])
  return (
    <div className='chatheadding-container'>
      <div className="profile-pic">
        <img src={backbtn} alt="backbtn" />
        <img src={dummypro} alt="propic" />
      </div>
      <div className="profile-name">
        
        <p>{data.name}</p>
        <p>{data.status?'online':'offline'}</p>
      </div>
      <div className="profile-options">
        <img src={optionsicon} alt="options" />
      </div>
    </div>
  )
}

export default ChatHeadding
