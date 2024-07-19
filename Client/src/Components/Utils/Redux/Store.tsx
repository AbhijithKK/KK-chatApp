import { configureStore } from '@reduxjs/toolkit'
import {userSlices,socketSlices} from '../Redux/Reducers'
import { authSlices } from './AuthReducer'



export const store = configureStore({
  reducer: {
    userData:userSlices,
    socketData:socketSlices,
    authData:authSlices
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['socketIo/socketUpdate'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload'],
        // Ignore these paths in the state
        ignoredPaths: ['socket'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch