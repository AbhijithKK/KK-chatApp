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
                res.status(200).cookie('token',token,{sameSite:'none',httpOnly:true,secure:true}).json(true)
                return
            }
            res.status(200).json(false)

        }
    } catch (error) {
        res.status(500).json(error)
    }
}
export const allUsers=async(req,res)=>{
    try {
        const newData=[]
        const data=await userModel.find();
        data.forEach(value => {
            
            let user={
                userId:data._id,
                name:data.name,
                image:data.image
            }
            newData.push(user)
        });
        res.json({data:newData,error:false})
    } catch (error) {
        res.status(500).json({data:false,
        error:true})
    }
}