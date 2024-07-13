import mongoose from "mongoose";

let createUser = mongoose.Schema(
  {
    name: {type:String,required},
    email: {type:String,required},
    number: {type:String,required},
    password: {type:String,required},
    cpassword: {type:String,required},
    image: {type:String,},
  },
  { timestamps: true }
);
export const userModel = mongoose.model("user", createUser);
