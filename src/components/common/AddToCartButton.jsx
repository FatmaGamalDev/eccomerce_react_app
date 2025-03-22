import React from "react";
import { addToCart } from "../../rtk/slices/Cart-Slice";
import { showToast } from "../../rtk/slices/Toast-Slice";
import { useDispatch } from "react-redux";
function AddToCartButton({
  selectedProduct,
  quantity,
  fromDetails = false,
  className = "",
}) {
  const dispatch = useDispatch();
  return (
      <button
        className={`main-btn
           ${className}`}
        onClick={() => {
          dispatch(
            addToCart({
              ...selectedProduct,
              quantity: fromDetails ? quantity : 1,
            })
          );
          dispatch(
            showToast({
              message: "Product Added Successfully",
              type: "success",
            })
          );
        }}
      >
        <span className="z-10">Add To Bag</span>
      </button>
  );
}

export default AddToCartButton;
