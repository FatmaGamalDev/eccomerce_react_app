import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateQuantity } from "../rtk/slices/Cart-Slice";
import { showToast } from "../rtk/slices/Toast-Slice";
import QuantitySelector from "../components/product/QuantitySelector";
import { useEffect, useState } from "react";
import AddToCartButton from "../components/product/AddToCartButton";

function Cart() {
  const cartProducts = useSelector((state) => state.cart) || [];
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center">
      <h1 className="my-4 text-2xl font-semibold text-center uppercase">
        MY CART
      </h1>
      <div className="w-[90%] flex flex-col gap-4">
        {cartProducts.map((cartItem) => (
          <div
            key={cartItem.id}
            className="grid items-center grid-cols-4 gap-4 p-4 bg-white shadow-md rounded-xl"
          >
            {/* product image*/}
            <div className="flex items-center col-span-1 gap-4">
              <img
                src={cartItem.images[0]}
                className="w-20 h-20 rounded-lg"
                alt={cartItem.title}
              />
              <div className="w-[100%]">
                <div className="font-bold">{cartItem.title}</div>
                <div className="text-sm opacity-50">{cartItem.brand}</div>
              </div>
            </div>

            {/* products quantity*/}
            <div className="col-span-1 ml-8">
              <QuantitySelector
                selectedProduct={cartItem}
                setQuantity={(newQuantity) =>
                  dispatch(
                    updateQuantity({ id: cartItem.id, quantity: newQuantity })
                  )
                }
                quantity={cartItem.quantity}
              />
            </div>
            {/* price*/}
            <div className="col-span-1 text-lg font-semibold">
              ${cartItem.price}
            </div>

            {/* remove button*/}
            <div className="col-span-1">
              <button
                className="text-xs font-bold underline text-pink hover:text-black hover:border-black"
                onClick={() => {
                  dispatch(deleteFromCart(cartItem));
                  dispatch(
                    showToast({
                      message: "Product removed from cart",
                      type: "success",
                    })
                  );
                }}
              >
                REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cart;
