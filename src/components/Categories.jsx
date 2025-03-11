import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import img2 from "../Assets/categories/perfume.png"
import img3 from "../Assets/categories/couch.png"
import img5 from "../Assets/categories/decoration.png"
import img1 from "../Assets/categories/eyeshadow.png"
import img4 from "../Assets/categories/apple.png"

import {
  fetchCategories,
  fetchProductsByCategory,
} from "../rtk/slices/Products-Slice";

function Categories() {
  const categories = useSelector((state) => state.products.categories);

  const dispatch = useDispatch();
const catImages = [img1,img2,img3,img4,img5]
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  function getProductsByCategory(categoryName) {
    dispatch(fetchProductsByCategory(categoryName));
  }
  return (
    <div className="container p-4 my-8">
      {/* desplay the categories we get from the categories state in buttons (10) */}
      <div className="grid grid-cols-5 spacing-1">
        {categories.slice(0, 5).map((cat,index) => {
          return (
            <>
              <div
                className="bg-grayColor w-56 h-24 p-[18px] relative"
                onClick={() => {
                  getProductsByCategory(cat);
                }}
                key={cat}
              >
                <p className="cursor-pointer hover:text-[#ff497c] text-lg capitalize">
                  {cat}
                </p>

                <div className="w-20 h-28 bg-white absolute bottom-3 right-3  border-gray-200 border rounded-md flex align-center content-center">
                  <img src={catImages[index]} alt="categoryImg" />
                </div>
              </div>
            </>
          );
        })}
      </div>
      </div>  );
}

export default Categories;
