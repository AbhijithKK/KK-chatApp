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
  const { chatId, userId, messages } = req.body;
  console.log(req.body);
  try {
    const newMessage = new messageModel({
      chatId,
      senderId:userId,
      message:messages,
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
    console.log(result);
    res.status(200).json({
        data:result,
        error:false
    });
  } catch (error) {
    res.status(500).json({
        data:false,
        error:true
    });
  }
};
// =========================================================
export const findAllChat = async (req, res) => {
  try {
      const token = await req.cookies?.token;
      const data = await jwtVerify(token);
      const result = await chatModel.find({ members: { $in: [data?.userId] } });
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
  const {receiverId } = req.params;
  try {
    const token = await req.cookies?.token;
      const data = await jwtVerify(token);
    const result = await chatModel.findOne({
      members: { $all: [data?.userId, receiverId] },
    });
    res.status(200).json({
        data:result,
        error:false
    });
  } catch (error) {
    res.status(500).json(
        {
            data:false,
            error:true
        }
    );
  }
};
// ===================================================================
