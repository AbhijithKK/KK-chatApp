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
    data:singleUserInterface
    status:boolean
    chatSelector:(data:singleUserInterface)=>void
  }

  export interface singleUserInterface{
    _id:string
    name:string
    image:string
    status:boolean

  }
  export interface chatText{
    senderId:string
    chatId:string
    message:string
    updatedAt:string
    createdAt:string
  }