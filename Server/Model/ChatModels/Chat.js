import mongoose from "mongoose";

let createChat = mongoose.Schema(
  {
    members: { type: Array },
  },
  { timestamps: true }
);
export const chatModel = mongoose.model("chat", createChat);
