import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsSlice from "../features/products/Products-Slice";
import cartSlice from "../features/cart/Cart-Slice";
import toastSlice from "../features/toast/Toast-Slice";
import ProductDetailsSlice from "../features/productDetails/ProaductDetails-Slice";
import loadingSlice from "../features/loading/loadingSlice";
import authSlice from "../features/auth/authSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import CategoriesSlice from "../features/categories/CategoriesSlice";
import UserSlice from "../features/user/UserSlice";

// redux-persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth","cart","categories","productDetails"],
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsSlice, // Product list and filters
  categories: CategoriesSlice, // Product categories
  cart: cartSlice, // Shopping cart
  wishlist: wishlistSlice, // Wishlist
  productDetails: ProductDetailsSlice, // Product detail view
  toast: toastSlice, // Toast notifications
  loading: loadingSlice, // Global loading state
  auth: authSlice, // Authentication (login/signup)
  user: UserSlice, // User profile and info
});

// Apply persist on rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor to control the persisted store in local storage
export const persistor = persistStore(store);
export default store;