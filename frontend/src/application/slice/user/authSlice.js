import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  otp: localStorage.getItem("otp") ? Number(localStorage.getItem("otp")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setRegisterCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
      localStorage.setItem("otp", action.payload);
    },
    clearRegisterDetails: (state, action) => {
      state.otp = null;
      state.user = null;
      localStorage.removeItem("otp");
      localStorage.removeItem("user");
    },
  },
});

export const {
  setCredentials,
  logout,
  setRegisterCredentials,
  setOtp,
  clearRegisterDetails,
} = authSlice.actions;

export default authSlice.reducer;
