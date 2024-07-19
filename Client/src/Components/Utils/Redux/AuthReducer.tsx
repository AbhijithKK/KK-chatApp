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
    userAuth: (state, action: PayloadAction<AuthState>) => {
      state.auth = action.payload as any;
    },
  },
});

export const { userAuth } = authSlice.actions;
export const authSlices = authSlice.reducer;
