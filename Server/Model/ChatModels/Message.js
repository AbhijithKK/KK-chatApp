import mongoose from "mongoose";

let createMessage = mongoose.Schema(
  {
    senderId: { type: string },
    chatId: { type: string },
    message: { type: string },
  },
  { timestamps: true }
);
export const messageModel = mongoose.model("messageModel", createMessage);
