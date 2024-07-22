import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
export interface ReduxUserstate {
  name: string;
  userId: string;
  image: string;
}
interface SocketState {
  socket: Socket | null;
}
const initialState: ReduxUserstate = {
  name: "",
  userId: "",
  image: "",
};
export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userUpdate: (state, action: PayloadAction<ReduxUserstate>) => {
      state.image=action.payload.image 
      state.name=action.payload.name
      state.userId=action.payload.userId
    },
  },
});
const socketState: SocketState = {
  socket: null,
};
export const sockerSlice = createSlice({
  name: "socketIo",
  initialState: socketState,
  reducers: {
    socketUpdate: (state, action: PayloadAction<Socket | null>) => {
      state.socket = action.payload as any;
    },
  },
});

export const { userUpdate } = userSlice.actions;
export const { socketUpdate } = sockerSlice.actions;

export const userSlices = userSlice.reducer;
export const socketSlices = sockerSlice.reducer;
