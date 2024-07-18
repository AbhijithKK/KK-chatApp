import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ReduxUserstate {
  name:string
  userId:string
  image:string
}

const initialState: ReduxUserstate = {
    name:'',
    userId:'',
    image:''
}
export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    userUpdate: (state,action:PayloadAction<ReduxUserstate>) => {
     
      return  action.payload
    },
   
  },
})
const socketState:any=null
export const sockerSlice = createSlice({
  name: 'socketIo',
  initialState:socketState,
  reducers: {
    socketUpdate: (state,action:PayloadAction<any>) => {
     
      return  action.payload
    },
   
  },
})

export const { userUpdate } = userSlice.actions
export const { socketUpdate } = sockerSlice.actions

export const userSlices= userSlice.reducer
export const socketSlices= sockerSlice.reducer
