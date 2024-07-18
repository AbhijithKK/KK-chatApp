import { configureStore } from '@reduxjs/toolkit'
import {userSlices,socketSlices} from '../Redux/Reducers'
export const store = configureStore({
  reducer: {
    userData:userSlices,
    socketData:socketSlices
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch