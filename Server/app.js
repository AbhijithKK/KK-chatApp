import Express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { configDotenv } from "dotenv";
import { db } from "./Model/DB/DB.js";
import morgan from "morgan";
configDotenv();
const app = Express();

app.use(Express.urlencoded({ extended: false }));
app.use(Express.json({ limit: "100mb" }));
app.use(morgan("dev"));
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

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("post", (msg) => {
    console.log(socket.id);
    socket.emit("get", msg);
  });
  db;
});
server.listen(3000, () => {
  console.log("server started on port 3000");
});
