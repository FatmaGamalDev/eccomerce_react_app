import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/products/Products-Slice";
import cartSlice from "../features/cart/Cart-Slice";
import toastSlice from "../features/toast/Toast-Slice";
import ProductDetailsSlice from "../features/productDetails/ProaductDetails-Slice";
import loadingSlice from "../features/loading/loadingSlice";
import authSlice from "../features/auth/authSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import CategoriesSlice from "../features/categories/CategoriesSlice";
import UserSlice from "../features/user/UserSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,             // Product list and filters
    categories: CategoriesSlice,         // Product categories
    cart: cartSlice,                     // Shopping cart
    wishlist: wishlistSlice,             // Wishlist
    productDetails: ProductDetailsSlice, // Product detail view
    toast: toastSlice,                   // Toast notifications
    loading: loadingSlice,               // Global loading state
    auth: authSlice,                     // Authentication (login/signup)
    user: UserSlice,                     // User profile and info
  },
});

export default store;
