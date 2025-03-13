import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartProducts = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(null);
  useEffect(() => {
    setCartItems(cartProducts.length);
  }, [cartProducts]);
  return (
    <div className="navbar bg-grayColor shadow-sm static z-10">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl text-pink text-2xl " to="/">
          shopingo
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu flex-row justify-center items-center px-1">
          <li>
            <Link to="/cart">
              <MdOutlineShoppingCart size={24} />
              <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-pink text-white flex justify-center items-center">
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
