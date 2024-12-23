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

// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: null,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;
