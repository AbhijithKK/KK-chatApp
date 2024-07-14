import { jwtVerify } from "../Middleware/Jwt.js";
import { jwtSign } from "../Middleware/Jwt.js";
import { userModel } from "../Model/UserModels/User.js";
import bcrypt from 'bcrypt'

export const signup=async(req,res)=>{
    const {name,email,number,password,cpassword,image}=req.body;
   let npassword=await bcrypt.hash(password,10)
    try {
        let verifyMail=await userModel.findOne({email})
        if (!verifyMail) {
        const newUser=new userModel({
            name,
            email,
            number,
            password:npassword,
            cpassword,
            image
        })
        await newUser.save()
        res.status(200).json(true)
        return
    }else{
        res.status(201).json(false)

    }
    } catch (error) {
        res.status(500).json(error)
    }
}
export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        let verifyMail=await userModel.findOne({email})
        if (!verifyMail) {
            res.status(200).json(false)
            return
        }else{
            let result=await bcrypt.compare(password,verifyMail.password)
            if(result){
                const token=await jwtSign(verifyMail._id,verifyMail.name)
                console.log(token);
                res.status(200).cookie('token',token,{sameSite:'none',httpOnly:true}).json(true)
                return
            }
            res.status(200).json(false)

        }
    } catch (error) {
        res.status(500).json(error)
    }
}
export const home=async(req,res)=>{
    try {
        const token=await req.cookies('token')
        const result=await jwtVerify(token)
        const data=await userModel.findOne({
            _id:result.userId
        })
        const newData={
            userId:data._id,
            name:data.name,
            image:data.image
        }
        res.json(newData)
    } catch (error) {
        res.status(500).json({data:false,
        error:error})
    }
}