import mongoose from "mongoose";

let createMessage = mongoose.Schema(
  {
    senderId: { type:String },
    chatId: { type:String },
    message: { type:String },
  },
  { timestamps: true }
);
export const messageModel = mongoose.model("messageModel", createMessage);
