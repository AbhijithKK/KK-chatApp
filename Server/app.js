import Express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { configDotenv } from "dotenv";
import { db } from "./Model/DB/DBconfig.js";
import morgan from "morgan";
import userRouter from "./Routers/userRouter.js";
import chatRouter from "./Routers/chatRoutes.js";
import cookieParser from "cookie-parser";
import path from 'path'
import { fileURLToPath } from 'url';
configDotenv();
const app = Express();

app.use(cookieParser());
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json({ limit: "100mb" }));
app.use(morgan("dev"));

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(Express.static(path.join(__dirname, 'Public')));
app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true,
  })
);
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use("/", userRouter);
app.use("/chat", chatRouter);

const connectedUsers=new Map();
const emitOnlineUsers = () => {
    const onlineUsers = Array.from(connectedUsers.keys()); 
    io.emit('onlineusers', onlineUsers);
  };
io.on("connection", (socket) => {
    socket.on("register",(userId)=>{
connectedUsers.set(userId,socket.id)   
emitOnlineUsers()
})
  console.log("connected");
  socket.on("post", (msg) => {
    const {receiverId}=msg;
    const ReceiverSocketId=connectedUsers.get(receiverId)
    if (ReceiverSocketId) {   
        io.to(ReceiverSocketId).emit("get", msg);
    }
  });
  // Handle disconnection
  socket.on("disconnect", () => {
    for (const [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
    emitOnlineUsers()

    console.log("disconnected");
  });
  emitOnlineUsers()

});
db();
server.listen(3000, () => {
  console.log("server started on port 3000");
});
