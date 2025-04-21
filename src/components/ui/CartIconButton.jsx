import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/Cart-Slice";
import { showToast } from "../../features/toast/Toast-Slice";
import { ShoppingCart } from "lucide-react";
import { BsBagPlus } from "react-icons/bs";
import { addToCartInSupabase } from "../../features/cart/CartThunks";

function CartIconButton({ selectedProduct }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) =>
    state.auth.user ? state.auth.user.id : null
  );

  const handleAddToCart = (product) => {
    const productWithQuantity = {
      ...product,
      quantity: 1,
    };
    if (userId) {
      dispatch(
        addToCartInSupabase({ product: productWithQuantity, userId: userId })
      );
    } else {
      dispatch(
        addToCart({
          ...selectedProduct,
          quantity: 1,
        })
      );
    }
    dispatch(
      showToast({
        message: "Added to Bag",
        type: "add",
        product: selectedProduct,
        quantity: 1,
      })
    );
  };

  return (
    <button onClick={(e) =>{ handleAddToCart(selectedProduct)
      e.stopPropagation()}

    } className="p-2 transition ">    
      <BsBagPlus className="w-6 h-6 text-gray-700 hover:text-pink" />
    </button>
  );
}

export default CartIconButton;
