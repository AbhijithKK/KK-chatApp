import Express  from "express";
import { Server } from "socket.io";
const app =Express( Server)
const io=new Server()

io.on('connection',(s)=>{
    console.log('connected');
})
app.listen(300 ,()=>{
    console.log('server started');
})
