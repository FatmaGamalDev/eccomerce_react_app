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

function App() {
  return (
    <>
      <ToastNotification />
      <Router>
        <ScrollToTop/>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="search" element={<SearchResults />} />
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
