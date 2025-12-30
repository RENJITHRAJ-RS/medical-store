import { createSlice } from "@reduxjs/toolkit";

/*
  AUTH SLICE
  ----------
  Purpose:
  - Handle login
  - Handle logout
  - Control authentication state
*/

const authSlice = createSlice({
  name: "auth",

  // 🔴 IMPORTANT:
  // user is always null when app starts
  // so Login page will show first
  initialState: {
    user: null
  },

  reducers: {
    // 🔹 Login action
    login: (state, action) => {
      /*
        action.payload example:
        {
          username: "renjith"
        }
      */
      state.user = action.payload;

      // store user in localStorage (optional)
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(action.payload)
      );
    },

    // 🔹 Logout action
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("loggedUser");
    }
  }
});

// Export actions
export const { login, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
