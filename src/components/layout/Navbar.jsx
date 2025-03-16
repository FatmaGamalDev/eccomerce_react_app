import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartProducts = useSelector((state) => state.cart.cart);
  const [cartItems, setCartItems] = useState(0);
  useEffect(() => {
    const totalQuantity = cartProducts.reduce((total, cartProduct) => total + cartProduct.quantity, 0);
    setCartItems(totalQuantity);
  }, [cartProducts]);
  return (
    <div className="shadow-sm -top-8 navbar bg-grayColor">
      <div className="flex-1">
        <Link className="text-xl text-2xl btn btn-ghost text-pink " to="/">
          shopingo
        </Link>
      </div>
      <div className="flex-none">
        <ul className="flex-row items-center justify-center px-1 menu">
          <li>
            <Link to="/cart">
              <MdOutlineShoppingCart size={28} />
              <span className="absolute top-0 flex items-center justify-center w-[18px] h-[18px] text-white rounded-full right-1 bg-pink">
                {cartItems}
              </span>
            </Link>
          </li>
          {/* <li>
          <FaRegHeart />
          </li> */}
        </ul>
      </div>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
        <Link to="signUp">Sign Up</Link>
      </button>
    </div>
  );
}
