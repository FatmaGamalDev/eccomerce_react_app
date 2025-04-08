import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../../features/products/components/SearchBar";
import Container from "../common/Container";
import { Heart } from "lucide-react";
import Logout from "../../features/auth/Logout";

export default function Navbar() {
  //get total number of product in the cart to show it on the cart icon on the nav
  const cartProducts = useSelector((state) => state.cart.cart);
  const [cartItems, setCartItems] = useState(0);
  useEffect(() => {
    const totalQuantity = cartProducts.reduce(
      (total, cartProduct) => total + cartProduct.quantity,
      0
    );
    setCartItems(totalQuantity);
  }, [cartProducts]);

  //get total number of product in the cart to show it on the cart icon on the nav
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  return (
    <nav className="sticky top-0 left-0 z-50 w-full bg-white shadow-md navbar">
      <Container className="navbar">
        <div className="flex-1 ">
          <NavLink
            className="text-2xl font-semibold border-none text-pink hover:bg-transparent"
            to="/"
          >
            Lumea
          </NavLink>
        </div>
        <SearchBar />
        {/* three icons div */}
        <div className="flex-none">
          <ul className="flex-row items-center justify-center px-1 menu ">
            {/* --- authentication dropdown ---*/}
            <div className="flex items-center justify-center dropdown dropdown-hover">
              {/* user icon */}
              <div tabIndex={0} role="button" className="relative m-1 btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              {/* authentication list */}
              <ul
                tabIndex={0}
                className="p-2 absolute top-[3rem] shadow-[0_0px_10px_rgba(0,0,0,0.2)] 
 dropdown-content menu bg-base-100 rounded-box z-1 w-48 "
              >
                <li>
                  <NavLink to="signUp" className="text-lg font-semibold ">
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
                    <Logout />
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* --------------wishlist icon link----------- */}
            <NavLink to="/wishList" className="relative">
              <Heart />
              {/* whislist items number  */}
              <div
                style={{ display: wishlist.length > 0 ? " block" : "none" }}
                className="absolute bottom-3 left-4 flex text-white font-semibold text-md items-center justify-center bg-pink  w-[18px] h-[18px]  text-[11px] rounded-full  "
              >
                <h6 className="text-center"> {wishlist.length}</h6>
              </div>
            </NavLink>
            {/* --------------cart icon link----------- */}
            <li>
              <NavLink to="/cart" className="hover:bg-transparent">
                {/* cart svg */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <div
                  style={{ display: cartItems > 0 ? " block" : "none" }}
                  className="absolute top-0 right-1 flex text-white font-semibold text-md items-center justify-center bg-pink  w-[18px] h-[18px]  text-[11px] rounded-full  "
                >
                  <h6 className="text-center"> {cartItems}</h6>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}
