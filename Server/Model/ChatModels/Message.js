import mongoose from "mongoose";


let createMessage = mongoose.Schema({
    senderId: { type: string },
    receiverId: { type: string },
    message:{type:string},
    name:{type:string},

}, { timestamps: true })
const messageModel = mongoose.model('messageModel', createMessage)
module.exports = { messageModel }