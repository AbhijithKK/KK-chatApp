import Express  from "express";
import {createServer} from 'http'
import { Server } from "socket.io";
import cors from 'cors';
import { configDotenv } from "dotenv";
import { log } from "console";

configDotenv()
const app =Express();
const server=createServer(app)
app.use(cors({
    origin:process.env.REACT_URL,
    credentials: true
}))
const io=new Server(server,{
    cors: {
        origin: process.env.REACT_URL, // Update this with your client's origin
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
})


io.on('connection',(socket)=>{
    console.log('connected');
    socket.on('post',(msg)=>{
        console.log(socket);
        socket.emit('get',msg)
    })
})
server.listen(3000,()=>{
    console.log('server started on port 3000');
})
