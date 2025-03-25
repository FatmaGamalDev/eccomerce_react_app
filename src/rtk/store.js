import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/Products-Slice";
import cartSlice from "./slices/Cart-Slice";
import toastSlice from"./slices/Toast-Slice";
import ProductDetailsSlice  from "./slices/ProaductDetails-Slice";
import loadingSlice from "./slices/loadingSlice";
const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    productDetails:ProductDetailsSlice,
    toast:toastSlice,
    loading: loadingSlice,
  },
});
export default store;
