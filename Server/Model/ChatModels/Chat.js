import mongoose from "mongoose";

let createChat = mongoose.Schema(
  {
    members: { type: Array },
  },
  { timestamps: true }
);
const chatModel = mongoose.model("chat", createChat);
module.exports = { chatModel };
