export interface user{
    name:string
    email:string
    number:string
    password:string
    cpassword:string
  }
  export interface loginFace{
    email:string
    password:string
  }
  export interface selectData{
    name:string
    userId:string
    image:string
  }
  export interface allusers{
    
      
        createdAt:string
        members:[string,string]
        _id:string
        updatedAt:string 
  }
  export interface conversationInterface{
    data:{
      name:string
      status:boolean
    }
    status:boolean
  }