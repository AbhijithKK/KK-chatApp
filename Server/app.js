import Express  from "express";
import {createServer} from 'http'
import { Server } from "socket.io";


const app =Express();
const server=createServer(app)
const io=new Server(server)

io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('post',(msg)=>{
        
        socket.emit('get',(msg)=>{
    
        })
    })
})
server.listen(3000,()=>{
    console.log('server started on port 3000');
})
