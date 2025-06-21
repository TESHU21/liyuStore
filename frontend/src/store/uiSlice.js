import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginOpen: false,
  isSignupOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isLoginOpen = true;
    },
    closeLogin: (state) => {
      state.isLoginOpen = false;
    },
    openSignup: (state) => {
      state.isSignupOpen = true;
    },
    closeSignup: (state) => {
      state.isSignupOpen = false;
    },
  },
});

export const { openLogin, closeLogin, openSignup, closeSignup } = uiSlice.actions;
export default uiSlice.reducer;
