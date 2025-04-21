import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Heart, UserRound } from "lucide-react";
import SignOutButton from "../ui/SignOutButton";
import { useSelector } from "react-redux";

function NavIcons() {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cartProducts = useSelector((state) => state.cart.cart);
  const [cartItems, setCartItems] = useState(0);
  useEffect(() => {
    const totalQuantity = cartProducts.reduce(
      (total, cartProduct) => total + cartProduct.quantity,
      0
    );
    setCartItems(totalQuantity);
  }, [cartProducts]);

  return (
    <ul className="flex flex-row items-center justify-end gap-[6px] px-0 menu">
      {/* navbar Dropdown */}
      <li className="flex items-center justify-center p-0 dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className="relative p-0 m-0 bg-transparent border-none btn hover:text-pink "
        >
          <UserRound strokeWidth={1.25} />
        </div>
        <ul
          tabIndex={0}
          className="p-2 absolute top-[3rem] right-0 shadow-lg bg-base-100 bg-gradient-to-b from-base-100 to-base-200 border border-gray-200 dropdown-content menu rounded-xl z-10 w-40 sm:w-48 animate-dropdown"
        >
          <li>
            <NavLink
              to="profile"
              className="text-base transition-all duration-300 sm:p-3 hover:text-pink hover:bg-gray-100"
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="signUp"
              className="text-base transition-all duration-300 sm:p-3 hover:text-pink hover:bg-gray-100"
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="signIn"
              className="text-base transition-all duration-300 sm:p-3 hover:text-pink hover:bg-gray-100"
            >
              Sign In
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="profile"
              className="p-2 transition-all duration-300 sm:p-3 hover:bg-gray-100"
            >
              <SignOutButton className="w-full text-base hover:text-pink hover:bg-transparent" />
            </NavLink>
          </li>
        </ul>
      </li>
      {/* Wishlist Icon */}
      <li>
        <NavLink
          to="/wishList"
          className="relative flex items-center p-0 hover:text-pink hover:bg-transparent"
        >
          <Heart strokeWidth={1.25} />
          <div
            style={{ display: wishlist.length > 0 ? "block" : "none" }}
            className="absolute bottom-3 left-4 flex text-white font-semibold text-md items-center justify-center bg-pink w-[18px] h-[18px] text-[11px] rounded-full"
          >
            <h6 className="text-center">{wishlist.length}</h6>
          </div>
        </NavLink>
      </li>
      {/* Cart Icon */}
      <li>
        <NavLink
          to="/cart"
          className="relative flex items-center p-0 hover:bg-transparent hover:text-pink"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.25"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <div
            style={{ display: cartItems > 0 ? "block" : "none" }}
            className="absolute bottom-3 left-3 flex text-white font-semibold text-md items-center justify-center bg-pink w-[18px] h-[18px] text-[11px] rounded-full"
          >
            <h6 className="text-center">{cartItems}</h6>
          </div>
        </NavLink>
      </li>
    </ul>
  );
}

export default NavIcons;
