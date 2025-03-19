import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { searchProducts } from "../../rtk/slices/Products-Slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit() {
    dispatch(searchProducts(searchQuery));
    navigate('/search')
  }
  return (
    <div className="relative flex items-center justify-center gap-4 w-[40%]">
      <input
        onChange={(event) => setSearchQuery(event.target.value)}
        type="text"
        placeholder="Search products ,brands, and categories"
        className=" pl-4 pr-12 py-[8px]  rounded-md shadow-md outline-none w-[90%]"
      />
      <button
        type="button"
        className="absolute top-2 right-8"
        onClick={handleSubmit}
      >
        <IoSearchOutline className="text-2xl font-bold text-pink pointer" />
      </button>
    </div>
  );
}

export default SearchBar;
