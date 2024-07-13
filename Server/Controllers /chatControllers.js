import { chatModel } from "../Model/ChatModels/Chat.js";
import { messageModel } from "../Model/ChatModels/Message.js";

export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    const newChat = new chatModel({
      members: [senderId, receiverId],
    });
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ====================================================
export const postMessages = async(req, res) => {
    const{chatId,senderId,message}=req.body;
  try {
    const newMessage=new messageModel({
        chatId,senderId,message
    })
    const result=await newMessage.save()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error);
  }
};
// ========================================================
export const getMessages = async(req, res) => {
    const {chatId}=req.params;
  try {
    const result=await messageModel.find({chatId:chatId})
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error);
  }
};
// =========================================================
export const findAllChat = async(req, res) => {
    const{userId}=req.params;
  try {
    const result=await chatModel.find(
        {members:{$in:[userId]}})
        res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error);
  }
};
// ========================================================
export const findOneChat = async(req, res) => {
    const{senderId,receiverId}=req.params;
  try {
    const result=await chatModel.findOne({
        members:{$all:[senderId,receiverId]}
    })
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json(error);
  }
};
// ===================================================================
