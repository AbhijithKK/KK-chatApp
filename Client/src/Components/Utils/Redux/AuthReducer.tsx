import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  auth: boolean;
}

const initialState: AuthState = {
  auth: false,
};
export const authSlice = createSlice({
  name: "checkAuth",
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload as any;
    },
  },
});

export const { updateAuth } = authSlice.actions;
export const authSlices = authSlice.reducer;
