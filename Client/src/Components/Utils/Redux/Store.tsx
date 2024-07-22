import { configureStore } from '@reduxjs/toolkit'
import {userSlices,socketSlices} from '../Redux/Reducers'
import { authSlices } from './AuthReducer'
import { onlineSlices } from './OnlineReducer'



export const store = configureStore({
  reducer: {
    userData:userSlices,
    socketData:socketSlices,
    authData:authSlices,
    onlineStatus:onlineSlices
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch