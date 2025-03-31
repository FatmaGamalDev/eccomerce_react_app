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
import { supabase } from "./supabaseClient";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // get the session when we open the app
  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  // const fetchAndUploadReviews = async () => {
  //   try {
  //     // 🟢 1️⃣ جلب المنتجات من Supabase لمعرفة الـ `id` الصحيح لكل منتج
  //     const { data: products, error: productsError } = await supabase.from("products").select("id, title");

  //     if (productsError) {
  //       console.error("❌ Error fetching products from Supabase:", productsError.message);
  //       return;
  //     }

  //     // 🟢 2️⃣ إنشاء خريطة تربط عنوان المنتج بالـ `id` الجديد من Supabase
  //     const productIdMap = {};
  //     products.forEach((product) => {
  //       productIdMap[product.title] = product.id;
  //     });

  //     // 🟢 3️⃣ جلب المنتجات والتقييمات من DummyJSON
  //     const response = await fetch("https://dummyjson.com/products?limit=100");
  //     const { products: dummyProducts } = await response.json();

  //     let reviewsData = [];

  //     dummyProducts.forEach((product) => {
  //       product.reviews?.forEach((review) => {
  //         const supabaseProductId = productIdMap[product.title]; // جلب `id` الصحيح
  //         if (supabaseProductId) {
  //           reviewsData.push({
  //             product_id: supabaseProductId,
  //             rating: review.rating,
  //             comment: review.comment,
  //             reviewerName: review.reviewerName,
  //             reviewerEmail: review.reviewerEmail,
  //             date: review.date,
  //           });
  //         }
  //       });
  //     });

  //     if (reviewsData.length === 0) {
  //       console.log("⚠️ No reviews to upload.");
  //       return;
  //     }

  //     // 🟢 4️⃣ رفع التقييمات إلى Supabase
  //     const { error: reviewsError } = await supabase.from("reviews").insert(reviewsData);

  //     if (reviewsError) {
  //       console.error("❌ Error uploading reviews:", reviewsError.message);
  //     } else {
  //       console.log("✅ All reviews uploaded successfully!");
  //     }
  //   }
  //   catch (error) {
  //     console.error("❌ Fetching reviews failed:", error.message);
  //   }
  // };

  // // 🔹 تشغيل تحميل التقييمات بعد تحميل المنتجات
  // useEffect(() => {
  //     fetchAndUploadReviews();
  // }, []);

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
