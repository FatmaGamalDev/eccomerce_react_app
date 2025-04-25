import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import CartPage from "../features/cart/CartPage";
import SignUpPage from "../features/auth/SignUpPage";
import SignInPage from "../features/auth/SignInPage";
import ProfilePage from "../features/user/ProfilePage";
import WishlistPage from "../features/wishlist/WishlistPage";
import SearchResults from "../features/products/components/SearchResults";
import ProductDetailsPage from "../features/productDetails/ProductDetailsPage";
import MainLayout from "../components/layout/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishList" element={<WishlistPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="signUp" element={<SignUpPage />} />
        <Route path="signIn" element={<SignInPage />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="product/:productID" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
