
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "",
  type: "", 
  product: null, 
  quantity:0,
  show: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      const { message, type,  product,quantity} = action.payload;
      state.message = message;
      state.type = type;
      state.product =  product || null;
      state.quantity= quantity 
      state.show = true;
    },
    hideToast: (state) => {
      state.show = false;
      state.product = null;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
