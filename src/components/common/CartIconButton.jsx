import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../rtk/slices/Cart-Slice";
import { showToast } from "../../rtk/slices/Toast-Slice";
import { ShoppingCart } from "lucide-react";

function CartIconButton({ selectedProduct, quantity = 1 }) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ ...selectedProduct, quantity }));
    dispatch(
      showToast({
        message: "Added to Bag",
        type: "add",
        product: selectedProduct,
        quantity,
      })
    );
  };

  return (
    <button onClick={handleAddToCart} className="p-2 transition ">
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-pink" />
    </button>
  );
}

export default CartIconButton;
