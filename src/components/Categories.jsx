import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { fetchCategories, fetchProductsByCategory } from "../rtk/slices/Products-Slice";
import categoryImages from "../utils/categoryImages";

function Categories() {
  const categories = useSelector((state) => state.products.categories);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoriesPerView, setCategoriesPerView] = useState(1);
  const categoryWidth = 260;

  useEffect(() => {
    dispatch(fetchCategories());
    updateCategoriesPerView();
    window.addEventListener("resize", updateCategoriesPerView);
    return () => window.removeEventListener("resize", updateCategoriesPerView);
  }, [dispatch]);

  function getProductsByCategory(categoryName) {
    dispatch(fetchProductsByCategory(categoryName));
  }

  const excludedCategories = [
    "groceries",
    "vehicle",
    "motorcycle",
    "mens-watches",
    "mens-shoes",
    "mens-shirts",
    "sports-accessories"
  ];
  const filteredCategories = categories.filter(
    (category) => !excludedCategories.includes(category)
  );

  const updateCategoriesPerView = () => {
    if (window.innerWidth >= 1024) {
      setCategoriesPerView(6); // lg
    } else if (window.innerWidth >= 768) {
      setCategoriesPerView(3); // md
    } else {
      setCategoriesPerView(1); // sm
    }
  };

  const maxIndex = Math.max(0, filteredCategories.length - categoriesPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="p-4 my-8 overflow-hidden">
    <div  className="flex items-center justify-between mb-14">
    <div className="mb-12 ">
       <h6 className="text-xl font-semibold text-pink">Top Categories</h6>

        <h1 className="text-3xl font-bold">Choose by Top Category</h1>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
                   <button
          onClick={prevSlide}
          className= " circle-btn"
          >
            <FaArrowLeftLong />
          </button>
          <button
          onClick={nextSlide}
          className=" circle-btn"
          >
            <FaArrowRightLong />
          </button>
        </div>
    </div>
      <div className="relative flex items-center">
     
        <div className="w-full overflowx-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * categoryWidth}px)` }}
          >
            {filteredCategories.map((category) => (
              <div
                key={category}
                className="relative flex items-center h-24 p-6 bg-gray-100 rounded-sm cursor-pointer min-w-64"
                onClick={() => getProductsByCategory(category)}
              >
                <p className="text-xl font-semibold text-gray-700 capitalize">
                  {category}
                </p>
                
              <div className="absolute flex content-center w-20 bg-white border border-gray-200 rounded-md h-28 bottom-3 right-3 align-center">
              <img
                    src={
                      categoryImages[category] ||
                      "https://via.placeholder.com/150"
                    }
                    alt={category}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>      
     
      </div>
    </div>
  );
}

export default Categories;


