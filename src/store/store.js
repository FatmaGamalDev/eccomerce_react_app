import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products/Products-Slice";
import cartSlice from "../features/cart/Cart-Slice";
import toastSlice from"../features/toast/Toast-Slice";
import ProductDetailsSlice  from "../features/productDetails/ProaductDetails-Slice";
import loadingSlice from "../features/loading/loadingSlice";
import authSlice from "../features/auth/authSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import CategoriesSlice from "../features/categories/CategoriesSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    categories: CategoriesSlice,
    cart: cartSlice,
    wishlist:wishlistSlice,
    productDetails:ProductDetailsSlice,
    toast:toastSlice,
    loading: loadingSlice,
    auth:authSlice
  },
});
export default store;
