import { useState } from 'react'
import './LandingPage.css'
import { io } from 'socket.io-client'
const LandingPage = () => {
    const socket=io(import.meta.env.VITE_SOCKET_URL)
    console.log(import.meta.env.VITE_SOCKET_URL);
    
    const [message,setMessage]=useState<string>('')
    const [Rmessage,setRMessage]=useState<string>('')
    socket.on('get',(msg:string)=>{
    setRMessage(msg)
    })
    const SendMessage=()=>{
       socket.emit('post',message)

   }
   
  return (
    <>
     <textarea 
     onChange={(e)=>setMessage(e.target.value)}
     style={{
        width:"100%"
     }}  ></textarea>
     <button onClick={SendMessage}>send</button>
     <h1>{Rmessage}</h1>
    </>
  )
}

export default LandingPage
