import mongoose from "mongoose";

let createMessage = mongoose.Schema(
  {
    senderId: { type: String, required: true },
    chatId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
export const messageModel = mongoose.model("messageModel", createMessage);
