import { Route, HashRouter as Router, Routes } from "react-router-dom";
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
import { getSession } from "./features/auth/authSlice";
import WishlistPage from "./features/wishlist/WishlistPage";
import {
  addToCartInSupabase,
  clearCart,
  fetchCartFromSupabase,
} from "./features/cart/Cart-Slice";
import ProfilePage from "./features/user/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const localCart = useSelector((state) => state.cart.cart);
  // get the session when we open the website
  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);
  // merge the product from local cart with supabase cart when the user signin or sign up and remove the lo
  useEffect(() => {
    if (user) {
      dispatch(fetchCartFromSupabase(user.id)).then((res) => {
        // const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        localCart.forEach((item) => {
          const exists = res.payload?.some(
            (dbItem) => dbItem.product_id === item.id
          );
          if (!exists) {
            dispatch(
              addToCartInSupabase({
                product: item,
                userId: user.id,
              })
            );
          }
        });
      });
    } else {
      // Clear cart when user logs out
      dispatch(clearCart());
    }
  }, [user]);

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
