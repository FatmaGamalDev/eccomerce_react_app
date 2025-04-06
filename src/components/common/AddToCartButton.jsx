import React from "react";
import { addToCart, addToCartInSupabase } from "../../rtk/slices/Cart-Slice";
import { showToast } from "../../rtk/slices/Toast-Slice";
import { useDispatch, useSelector } from "react-redux";

function AddToCartButton({
  selectedProduct,
  quantity,
  fromDetails = false,
  className = "",
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?state.auth.user.id:null);
  // Handle adding to cart
  const handleAddToCart = (product) => {
    const productWithQuantity = {
      ...product,
      quantity: fromDetails ? quantity : 1,
    };
    if (userId) {
      dispatch(
        addToCartInSupabase({ product: productWithQuantity, userId: userId })
      )
    }else{
      dispatch(
        addToCart({
          ...selectedProduct,
          quantity: fromDetails ? quantity : 1,
        })
      );
    }
      dispatch(
        showToast({
          message: "Added to Bag",
          type: "add",
          product: selectedProduct,
          quantity: fromDetails ? quantity : 1,
        })
      );
    }
  
  return (
    <button
      className={`main-btn
           ${className}`}
      onClick={() =>handleAddToCart(selectedProduct)}
    >
      <span className="z-10">Add To Bag</span>
    </button>
  );
}
export default AddToCartButton;
