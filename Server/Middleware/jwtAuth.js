import  Jwt  from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()


export const jwtSign=(userId,name,)=>{
 let result=  Jwt.sign({
        userId,name
      }, process.env.JWT_SECRECT, { expiresIn: '1h' });
      return result
}