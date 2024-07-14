import { userModel } from "../Model/UserModels/User.js";
import { jwtVerify } from "./Jwt.js";

export const auth = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    const result = await jwtVerify(token);
    const data = await userModel.findOne({ _id: result?.userId });
    if (!data) {
      res.status(500).json("Login again");
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json("Login again");
  }
};
