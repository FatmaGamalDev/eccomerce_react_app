import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/Products-Slice";
import cartSlice from "./slices/Cart-Slice";
const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});
export default store;
