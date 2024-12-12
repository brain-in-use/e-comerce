import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null, // Optional: Store user details here
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Example: Store user details
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null; // Clear user details
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
