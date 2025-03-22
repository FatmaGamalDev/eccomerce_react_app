import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { searchProducts } from "../../rtk/slices/Products-Slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setFilteredProducts([]);
      return;
    }

    const lowerCaseValue = value.toLowerCase();

    const filtered = products
      .filter((product) =>
        product.title.toLowerCase().startsWith(lowerCaseValue)
      )
      .map((product) => product.title);

    setFilteredProducts(filtered);
  };

  const handleSelect = (selectedItem) => {
    setSearchQuery(""); // تصفير الحقل بعد البحث
    setFilteredProducts([]);
    dispatch(searchProducts(selectedItem));
    navigate("/search");
  };

  function handleSubmit() {
    if (!searchQuery) return;
    dispatch(searchProducts(searchQuery));
    navigate("/search");
    setSearchQuery(""); // مسح البحث بعد التنقل
  }

  return (
    <div className="relative flex items-center justify-center w-[25%]">
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full pl-4 pr-12 py-[8px] border border-gray-300 rounded-md focus:shadow-md outline-none"
        />

        {filteredProducts.length > 0 && (
          <ul className="absolute left-0 z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md max-h-40">
            {filteredProducts.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        className="absolute top-2 right-[5%]"
        onClick={handleSubmit}
      >
        <IoSearchOutline className="text-2xl text-gray-500 pointer" />
      </button>
    </div>
  );
}

export default SearchBar;
