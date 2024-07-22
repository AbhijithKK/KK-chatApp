import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  onlineUsers?:[]
}

const initialState: AuthState = {
  onlineUsers:[],
 
};
export const authSlice = createSlice({
  name: "onlineStatus",
  initialState,
  reducers: {
    updateOnline: (state, action: PayloadAction<AuthState>) => {
      state.onlineUsers = action.payload.onlineUsers as any;
    },
  },
});

export const { updateOnline } = authSlice.actions;
export const onlineSlices = authSlice.reducer;
