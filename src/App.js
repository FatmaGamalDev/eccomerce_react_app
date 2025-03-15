import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import ToastNotification from "./components/ToastNotification";
import 'react-toastify/dist/ReactToastify.css';
import NewsSignup from "./components/NewsSignup";

function App() {
  return (
    <>
    <ToastNotification/>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signUp" element={<SignUp/>} />
          <Route path="product/:productID" element={<ProductDetails />} />
        </Routes>
        <NewsSignup/>
        <Footer/>

      </div>
    </Router>
    </>
  );
}

export default App;
