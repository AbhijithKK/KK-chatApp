import Express from "express";
import { createChat, findAllChat, findOneChat, getMessages, postMessages } from "../Controllers /chatControllers.js";
import { auth } from "../Middleware/Auth.js";

const router = Express.Router();

router.post("/create",auth, createChat);
router.post("/message",auth, postMessages);
router.get("/message/:chatId",auth, getMessages);
router.get("/findall/:userId",auth, findAllChat);
router.get("/findone/:senderId/:receiverId",auth,findOneChat);

export default router;
