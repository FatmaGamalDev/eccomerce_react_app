import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/Products-Slice";
import cartSlice from "./slices/Cart-Slice";
import toastSlice from"./slices/Toast-Slice";
const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    toast:toastSlice
  },
});
export default store;
