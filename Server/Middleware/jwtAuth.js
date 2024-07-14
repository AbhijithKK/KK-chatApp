import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const jwtSign = async (userId, name) => {
  try {
    let result = await Jwt.sign(
      {
        userId,
        name,
      },
      process.env.JWT_SECRECT,
      { expiresIn: "1h" }
    );
    return result;
  } catch (error) {}
};
export const jwtVerify = async (token) => {
  try {
    let result = await Jwt.verify(
      {
        token,
      },
      process.env.JWT_SECRECT
    );
    return result;
  } catch (error) {}
};
