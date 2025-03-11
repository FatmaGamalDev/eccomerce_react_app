import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import {Toaster} from "react-hot-toast"; 

function App() {
  return (
    <>
    <Toaster reverseOrder={false}/>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signUp" element={<SignUp/>} />
          <Route path="product/:productID" element={<ProductDetails />} />
        </Routes>
        <Footer/>

      </div>
    </Router>
    </>
  );
}

export default App;
