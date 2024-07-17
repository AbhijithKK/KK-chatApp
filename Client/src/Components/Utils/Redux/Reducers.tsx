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

export const { userUpdate } = userSlice.actions

export default userSlice.reducer