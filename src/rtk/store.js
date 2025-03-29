import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/Products-Slice";
import cartSlice from "./slices/Cart-Slice";
import toastSlice from"./slices/Toast-Slice";
import ProductDetailsSlice  from "./slices/ProaductDetails-Slice";
import loadingSlice from "./slices/loadingSlice";
import authSlice from "./slices/authSlice"
import wishlistSlice from "./slices/wishlistSlice"

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    wishlist:wishlistSlice,
    productDetails:ProductDetailsSlice,
    toast:toastSlice,
    loading: loadingSlice,
    auth:authSlice
  },
});
export default store;
