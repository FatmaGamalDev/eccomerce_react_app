import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import NewsSignup from "./components/ui/NewsSignup";
import ToastNotification from "./components/ui/ToastNotification";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import SignUp from "./pages/SignUp";
import SearchResults from "./pages/SearchResults";
import ScrollToTop from "./components/ui/ScrollToTop";
import Loader from "./components/common/Loader";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSession } from "./rtk/slices/authSlice";
import Wishlist from "./pages/Wishlist";
import {
  addToCartInSupabase,
  fetchCartFromSupabase,
} from "./rtk/slices/Cart-Slice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // get the session when we open the app
  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);
   // fetch cart products from supabase if user sign in and delete the local cart
  useEffect(() => {
    if (user) {
      dispatch(fetchCartFromSupabase(user.id)).then((res) => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
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
        localStorage.removeItem("cart");
      });
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
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="wishList" element={user ? <Wishlist /> : <SignIn />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="profile" element={user ? <Profile /> : <SignIn />} />
            <Route path="product/:productID" element={<ProductDetails />} />
          </Routes>
          <NewsSignup />
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
