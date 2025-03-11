import React from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="navbar bg-grayColor shadow-sm static z-10">
      <div className="flex-1">
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        <Link className="btn btn-ghost text-xl text-pink text-2xl " to="/">
          shopingo
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu flex-row justify-center items-center px-1">
          <li>
            <Link to="/cart">
            <MdOutlineShoppingCart size={24} />
              {/* <span className="badge badge-sm indicator-item">8</span> */}
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
