import Express from "express";

const router = Express.Router();

router.post("/create", createChat);
router.post("/message", postMessages);
router.get("/message/:chatId", getMessages);
router.get("/findall/:userId", findAllChat);
router.get("/findone/:senderId/:receiverId", findOneChat);

export default router;
