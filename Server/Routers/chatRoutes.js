import Express from "express";

const router = Express.Router();

router.post("/create", createChat);
router.post("/message", postMessages);
router.get("/message", getMessages);
router.get("/findall", findAllChat);
router.get("/findone", findOneChat);

export default router;
