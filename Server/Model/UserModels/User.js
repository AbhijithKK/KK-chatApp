import mongoose from "mongoose";

let createUser = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);
export const userModel = mongoose.model("user", createUser);
