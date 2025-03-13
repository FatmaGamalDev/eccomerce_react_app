import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "success",
  show: false,
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.show = true;
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
});
export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
