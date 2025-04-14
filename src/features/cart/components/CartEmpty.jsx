import React from "react";
import CartSvg from "../../../Assets/download.svg";
import { useNavigate } from "react-router-dom";

function CartEmpty() {
  const navigate= useNavigate()
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img src={CartSvg} alt="Cart Icon" className="w-80 h-80" />
      <h1 className="mt-1 text-gray-500">Your Shopping Cart is Empty</h1>
      <button className="w-32 mt-8 main-btn" onClick={()=>navigate("/")}>
        <span className="z-10"> SHOP NOW</span>
      </button>
    </div>
  );
}

export default CartEmpty;
