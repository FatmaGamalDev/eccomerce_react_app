import React from "react";
import { addToCart } from "../../rtk/slices/Cart-Slice";
import { showToast } from "../../rtk/slices/Toast-Slice";
import { useDispatch} from "react-redux";
function AddToCartButton({selectedProduct, quantity, fromDetails = false, className = ""}) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between align-center">
      <button
        className={`text-white btn bg-pink hover:bg-pink ${className}`}
        onClick={() => {
          dispatch(addToCart({...selectedProduct,
             quantity: fromDetails? quantity:1}));
          dispatch(
            showToast({
              message: "Product Added Successfully",
              type: "success",
            })
          );
        }}
      >
        AddToCart
      </button>
    </div>
  );
}

export default AddToCartButton;
