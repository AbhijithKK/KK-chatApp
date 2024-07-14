import mongoose from "mongoose";
import env from "dotenv";
env.configDotenv()
export const db = () => {
  mongoose.connect(process.env.DB_URL).then(() => console.log("Connected! Db"));
};
