import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../../features/products/components/SearchBar";
import Container from "../common/Container";
import { Heart, UserRound } from "lucide-react";
import SignOutButton from "../common/SignOutButton";

export default function Navbar() {
  const cartProducts = useSelector((state) => state.cart.cart);
  const [cartItems, setCartItems] = useState(0);
  useEffect(() => {
    const totalQuantity = cartProducts.reduce(
      (total, cartProduct) => total + cartProduct.quantity,
      0
    );
    setCartItems(totalQuantity);
  }, [cartProducts]);
  
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white shadow-md navbar py-2 min-h-[85px]">
      <Container className="px-[5px] sm:px-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        {/* Row 1: Logo and Icons on small screens */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              className="text-2xl font-semibold border-none text-pink hover:bg-transparent"
              to="/"
            >
              Lumea
            </NavLink>
          </div>
          {/* Icons on small screens only */}
          <div className="flex-none sm:hidden">
            <ul className="flex flex-row items-center gap-[6px] px-0 menu sm:gap-[6px]">
              {/* Authentication Dropdown */}
              <li className="flex items-center justify-center p-0 dropdown dropdown-hover">
                <div tabIndex={0} role="button" className="relative p-0 m-0 bg-transparent border-none btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="p-2 absolute top-[3rem] right-0 shadow-[0_0px_10px_rgba(0,0,0,0.2)] dropdown-content menu bg-base-100 rounded-box z-10 w-48"
                >
                  <li>
                    <NavLink to="signUp" className="text-lg font-semibold">
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="signIn" className="text-lg font-semibold">
                      Sign In
                    </NavLink>
                  </li>
                  <li className="w-full">
                    <NavLink to="profile">
                      <SignOutButton/>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {/* Wishlist Icon */}
              <li>
                <NavLink to="/wishList" className="relative flex items-center p-0">
                  <Heart />
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
                <NavLink to="/cart" className="relative flex items-center p-0 hover:bg-transparent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="cursor-pointer size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <div
                    style={{ display: cartItems > 0 ? "block" : "none" }}
                    className="absolute bottom-3 left-4 flex text-white font-semibold text-md items-center justify-center bg-pink w-[18px] h-[18px] text-[11px] rounded-full"
                  >
                    <h6 className="text-center">{cartItems}</h6>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {/* Search Bar */}
        <div className="w-full sm:w-[50%] self-center sm:flex sm:items-center sm:ml-auto sm:mr-4">
          <SearchBar />
        </div>
        {/* Icons on large screens only */}
        <div className="hidden sm:flex sm:flex-none">
          <ul className="flex flex-row items-center justify-end gap-[6px] px-0 menu">
            {/* Authentication Dropdown */}
            <li className="flex items-center justify-center p-0 dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="relative p-0 m-0 bg-transparent border-none btn hover:text-pink">
              <UserRound strokeWidth={1.25} />              </div>
              <ul
                tabIndex={0}
                className="p-2 absolute top-[3rem] right-0 shadow-[0_0px_10px_rgba(0,0,0,0.2)] dropdown-content menu bg-base-100 rounded-box z-10 w-48"
              >
                  <li>
                  <NavLink to="profile" className="text-lg font-semibold hover:text-pink">
                    My Account
                  </NavLink>
                </li>
                <li>
                  <NavLink to="signUp" className="text-lg font-semibold hover:text-pink">
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink to="signIn" className="text-lg font-semibold hover:text-pink">
                    Sign In
                  </NavLink>
                </li>
                <li className="w-full">
                  <NavLink to="profile">
                    <SignOutButton/>
                  </NavLink>
                </li>
              </ul>
            </li>
                {/* Wishlist Icon */}
                <li>
              <NavLink to="/wishList" className="relative flex items-center p-0 hover:text-pink hover:bg-transparent">
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
              <NavLink to="/cart" className="relative flex items-center p-0 hover:bg-transparent hover:text-pink">
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
        </div>
      </Container>
    </nav>
  );
}