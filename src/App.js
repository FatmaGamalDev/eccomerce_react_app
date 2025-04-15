import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { supabase } from "./api/supabaseClient";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import NewsSignup from "./components/ui/NewsSignup";
import ToastNotification from "./features/toast/ToastNotification";
import CartPage from "./features/cart/CartPage";
import HomePage from "./features/home/HomePage";
import ProductDetailsPage from "./features/productDetails/ProductDetailsPage";
import SignUpPage from "./features/auth/SignUpPage";
import SearchResults from "./features/products/components/SearchResults";
import ScrollToTop from "./components/ui/ScrollToTop";
import Loader from "./features/loading/Loader";
import SignInPage from "./features/auth/SignInPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { getSession } from "./features/auth/authSlice";
import WishlistPage from "./features/wishlist/WishlistPage";
// import {
//   addToCartInSupabase,
//   clearCart,
//   fetchCartFromSupabase,
//   setWasGuest,
// } from "./features/cart/Cart-Slice";
import ProfilePage from "./features/user/ProfilePage";
import { setUser } from "./features/auth/authSlice";
import useMergeGuestCart from "./features/cart/hooks/useMergeGuestCart";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        dispatch(setUser(data.session.user));
      }
    };
    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          dispatch(setUser(session.user));
        } else {
          dispatch(setUser(null));
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [dispatch]);

  useMergeGuestCart();

  return (
    <>
      <ToastNotification />
      <Router>
        <ScrollToTop />
        <div className="App">
          <Navbar />
          <Loader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="signIn" element={<SignInPage />} />
            <Route path="Profile" element={<ProfilePage />} />
            <Route path="wishList" element={<WishlistPage />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="product/:productID" element={<ProductDetailsPage />} />
          </Routes>
          <NewsSignup />
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
