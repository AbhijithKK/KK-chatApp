import axios from 'axios';
import { user } from './Interface';
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    
    headers: {'contentType':'application/json'},
    withCredentials:true
  });
  

  export const signupApi=async({name,email,number,password,cpassword}:user)=>{
    try {
        const {data}=await api.post('/signup',{name,email,number,password,cpassword})
        return data

    } catch (error) {
        console.log(error);
        return false
    }
  }