import axios from 'axios';
import { allusers, loginFace, user } from './Interface';
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

  export const loginApi=async({email,password}:loginFace)=>{
    try {
      const {data}=await api.post('/login',{email,password})
      return data

    } catch (error) {
      return false
    }
  }
  export const homeApi=async()=>{
    try {
      const {data}=await api.get('/chat/findall')
      return data

    } catch (error) {
      return {error:true}
    }
  }
  export const allUserApi=async(search:string)=>{
    try {
      const {data}=await api.get(`/alluser?search=${search}`)
      return data

    } catch (error) {
      return {error:true}
    }
  }
  export const createChatApi=async(receiverId:string)=>{
    try {
      const {data}=await api.post('/chat/create',{receiverId})
      return data

    } catch (error) {
      return {error:true}
    }
  }
  export const fetchChatUserApi=async(allUsers:allusers[])=>{
    try {
      const {data}=await api.post('/userdata',{allUsers})
      return data

    } catch (error) {
      return {error:true}
    }
  }
  export const getChatApi=async(senderId:string,receiverId:string)=>{
    try {
      const {data}=await api.get('/chat/findone',{params:{senderId,receiverId}})
      return data

    } catch (error) {
      return {error:true}
    }
  }