import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicines: JSON.parse(localStorage.getItem("medicines")) || []
};

const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    addMedicine: (state, action) => {
      state.medicines.push(action.payload);
      localStorage.setItem("medicines", JSON.stringify(state.medicines));
    },
    deleteMedicine: (state, action) => {
      state.medicines = state.medicines.filter(
        m => m.id !== action.payload
      );
      localStorage.setItem("medicines", JSON.stringify(state.medicines));
    },
    updateMedicine: (state, action) => {
      const index = state.medicines.findIndex(
        m => m.id === action.payload.id
      );
      state.medicines[index] = action.payload;
      localStorage.setItem("medicines", JSON.stringify(state.medicines));
    }
  }
});

export const { addMedicine, deleteMedicine, updateMedicine } =
  medicineSlice.actions;
export default medicineSlice.reducer;
updateMedicine: (state, action) => {
  const index = state.medicines.findIndex(
    m => m.id === action.payload.id
  );
  state.medicines[index] = action.payload;
  localStorage.setItem("medicines", JSON.stringify(state.medicines));
}
