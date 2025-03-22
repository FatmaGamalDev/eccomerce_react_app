import { useDispatch } from "react-redux";
import { deleteFromCart, updateQuantity } from "../../rtk/slices/Cart-Slice";
import QuantitySelector from "../common/QuantitySelector";

function CartProducts({ cartProducts, showToast }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center w-full md:w-2/3">
    
      <div className="flex flex-col w-[95%] gap-4 ">
      <h1 className="self-start mt-4 text-2xl font-semibold uppercase ">
      Bag Summary ({cartProducts.length} )
      </h1>
        {cartProducts.map((cartItem) => (
          <div key={cartItem.id} className="p-4 bg-white shadow-md rounded-xl">
            {/* product image*/}
            <div className="flex items-center gap-2">
              <img
                src={cartItem.images[0]}
                className="w-[7rem]  opject-cover "
                alt={cartItem.title}
              />
              {/* title */}
              <div className="flex flex-col justify-start min-h-0 ">
                <div>
                  <div className="font-bold">{cartItem.title}</div>
                  <div className="text-sm opacity-50">{cartItem.brand}</div>

                  <div className="text-sm text-gray-700 font-simi-bold">
                    {cartItem.shippingInformation}
                  </div>
                </div>
                {/* price*/}
                <div className="flex text-lg font-semibold ">
                  ${cartItem.subtotal.toFixed(2)}
                </div>
              </div>
            </div>
<div className="flex justify-between">
            {/* products quantity*/}
            <div className="flex mt-4 ">
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

            {/* remove button*/}
            <div className="flex justify-end">
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
          </div>
        ))}
      </div>
    </div>
  );
}
export default CartProducts;
