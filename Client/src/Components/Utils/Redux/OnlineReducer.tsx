import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { singleUserInterface } from "../Interface";

interface AuthState {
  setSingleuser:()=>void
  singleUser:singleUserInterface|null
  onlineUsers:[]
}

const initialState: AuthState = {
  setSingleuser:()=>{},
  singleUser:null,
  onlineUsers:[]
};
export const authSlice = createSlice({
  name: "onlineStatus",
  initialState,
  reducers: {
    updateOnline: (state, action: PayloadAction<AuthState>) => {
      state.onlineUsers = action.payload.onlineUsers as any;
      state.singleUser=action.payload.singleUser as any
      state.setSingleuser=action.payload.setSingleuser as any
    },
  },
});

export const { updateOnline } = authSlice.actions;
export const onlineSlices = authSlice.reducer;
