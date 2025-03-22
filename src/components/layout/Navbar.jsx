import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../common/SearchBar";
import Container from "../common/Container";

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
  return (
    <nav>
      <Container className="z-20 shadow-sm navbar">
        <div className="flex-1 ">
          <NavLink
            className="text-4xl border-none text-pink hover:bg-transparent"
            to="/"
          >
            luva
          </NavLink>
        </div>
        
        <SearchBar />
        <div className="flex-none">
          <ul className="flex-row items-center justify-center px-1 menu">
            <li>
              <NavLink to="/cart">
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

        <NavLink
          to="signUp"
          className={({ isActive }) =>
            `text-lg font-semibold ${
              isActive ? "text-pink-500" : "text-gray-700"
            }`
          }
        >
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
        </NavLink>
      </Container>
    </nav>
  );
}
