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
        const result=await newUser.save()
        res.status(200).json(result)
    }else{
        res.status(201).json('Already have an account')

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
            res.status(200).json('Please enter currect Email and Password')

        }else{
            let result=await bcrypt.compare(password,verifyMail.password)
            if(result){

                res.status(200).json(result)
                return
            }
            res.status(200).json('Please enter currect Email and Password')

        }
    } catch (error) {
        res.status(500).json(error)
    }
}
export const home=(req,res)=>{
    try {
        res.json('welcome home')
    } catch (error) {
        res.status(500).json(error)
    }
}