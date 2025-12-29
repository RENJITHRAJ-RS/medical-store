import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("loggedUser")) || null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("loggedUser");
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
