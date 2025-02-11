import Express from "express";
import {
  createChat,
  findAllChat,
  findOneChat,
  getMessages,
  postMessages,
} from "../Controllers /chatControllers.js";
import { auth } from "../Middleware/Auth.js";

const router = Express.Router();

router.post("/create", auth, createChat);
router.post("/message", auth, postMessages);
router.get("/message/:chatId", auth, getMessages);
router.get("/findall", auth, findAllChat);
router.get("/findone/:receiverId", auth, findOneChat);

export default router;
