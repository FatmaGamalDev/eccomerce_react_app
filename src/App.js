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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import WishlistPage from "./features/wishlist/WishlistPage";
import ProfilePage from "./features/user/ProfilePage";
import { setUser } from "./features/auth/authSlice";
import useMergeGuestCart from "./features/cart/hooks/useMergeGuestCart";
import useMergeGuestWishlist from "./features/wishlist/hooks/useMergeGuestWishlist";

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
    // const { data: listener } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     if (session?.user) {
    //       dispatch(setUser(session.user));
    //     } else {
    //       dispatch(setUser(null));
    //     }
    //   }
    // );
    // return () => {
    //   listener?.subscription?.unsubscribe();
    // };
  }, []);
// get the cart when open the app and merge it with local cart if the user was useing the cart as aguest
  useMergeGuestCart();
// get the wishlist when open the app and merge it with local wishlist if the user was useing the wishlist as aguest
useMergeGuestWishlist();
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
