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
import {
  addToCartInSupabase,
  clearCart,
  fetchCartFromSupabase,
  setWasGuest,
} from "./features/cart/Cart-Slice";
import ProfilePage from "./features/user/ProfilePage";
import { setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const localCart = useSelector((state) => state.cart.cart);
  const wasGuest = useSelector((state) => state.cart.wasGuest);

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
  // get the session when we open the app to know if there is a user loggedin or not
  // useEffect(() => {
  //   dispatch(getSession());
  // }, [dispatch]);

  // merge the product from local cart with supabase cart when the user signin or sign up 
  // after using the cart as aguest and remove the lo
  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }
  //   if (user) {
  //     dispatch(fetchCartFromSupabase(user.id)).then((res) => {
  //       localCart.forEach((item) => {
  //         const exists = res.payload?.some(
  //           (dbItem) => dbItem.product_id === item.id
  //         );
  //         if (!exists) {
  //           dispatch(
  //             addToCartInSupabase({
  //               product: item,
  //               userId: user.id,
  //             })
  //           );
  //         }
  //       });
  //     });
  //   } else {
  //     // Clear cart when user logs out
  //     dispatch(clearCart());
  //   }
  // }, [user]);


  
useEffect(() => {
  if (!user) return;

  dispatch(fetchCartFromSupabase(user.id)).then((res) => {
    if (wasGuest) {
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

      dispatch(setWasGuest(false));
    }
  });
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

