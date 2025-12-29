import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import medicineReducer from "../features/medicineSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicine: medicineReducer
  }
});
