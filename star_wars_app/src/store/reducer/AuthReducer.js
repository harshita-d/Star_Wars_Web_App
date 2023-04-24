import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, authData: null };

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggingStatus(state, action) {
      state.isLoggedIn = !state.isLoggedIn;
      state.authData = action.payload;
    },
  },
});

export const authActions = authReducer.actions;

export default authReducer;
