import { jwtVerify } from "../Middleware/Jwt.js";
import { chatModel } from "../Model/ChatModels/Chat.js";
import { messageModel } from "../Model/ChatModels/Message.js";

export const createChat = async (req, res) => {
  const {  receiverId } = req.body;
  try {
    const token = await req.cookies?.token;
    const data = await jwtVerify(token);
    let senderId=data.userId

    const verify=await chatModel.find({members:{$all:[senderId, receiverId]}})
   if(!verify.length){
    const newChat = new chatModel({
      members: [senderId, receiverId],
    });
    const result = await newChat.save();
}
res.status(200).json(true);
  } catch (error) {
    res.status(500).json(false);
  }
};

// ====================================================
export const postMessages = async (req, res) => {
  const { chatId, senderId, message } = req.body;
  try {
    const newMessage = new messageModel({
      chatId,
      senderId,
      message,
    });
    const result = await newMessage.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
// ========================================================
export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await messageModel.find({ chatId: chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
// =========================================================
export const findAllChat = async (req, res) => {
  try {
      const token = await req.cookies?.token;
      const data = await jwtVerify(token);
      const result = await chatModel.find({ members: { $in: [data?.userId] } });
      console.log(result);
    if (!data) {
      res.status(401).json({
        data: false,
        error: true,
      });
      return;
    }
    res.status(200).json({
      data: result,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      data: false,
      error: true,
    });
  }
};
// ========================================================
export const findOneChat = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const result = await chatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
// ===================================================================
