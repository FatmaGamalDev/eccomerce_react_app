import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateQuantity } from "../Cart-Slice";
import QuantitySelector from "../../../components/ui/QuantitySelector";
import AddToCartButton from "../../../components/ui/AddToCartButton";
import { deleteFromWishlist } from "../../wishlist/WishlistSlice";
import {
  deleteFromCartInSupabase,
  updateQuantityInSupabase,
} from "../CartThunks";
import { deleteFromWishlistInSupabase } from "../../wishlist/WishlistThunks";

function CartProducts({ cartProducts, showToast, isWishlist }) {
  const userId = useSelector((state) =>
    state.auth.user ? state.auth.user.id : null
  );
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center w-full mb-8 md:w-2/3">
      <div className="flex flex-col w-[95%] gap-4 ">
        {cartProducts.map((cartItem) => (
          <div key={cartItem.id} className="p-4 bg-white shadow-md rounded-xl">
            {/* product image*/}
            <div className="flex items-center gap-2">
              <img
                src={cartItem.thumbnail || "default-image.jpg"}
                className="w-[7rem]  opject-cover "
                alt={cartItem.title}
              />
              {/* title */}
              <div className="flex flex-col justify-start min-h-0 ">
                <div>
                  <div className="font-bold">{cartItem.title}</div>
                  <div className="text-sm opacity-50">{cartItem.brand}</div>
                </div>
                {/* price*/}
                <div className="flex text-lg font-semibold ">
                  {cartItem.price}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              {/* products quantity*/}
              {isWishlist ? (
                <div className="flex justify-start w-full gap-8 ">
                  <AddToCartButton
                    selectedProduct={cartItem}
                    fromDetails={false}
                    className="w-40 bg-white text-pink"
                  />
                </div>
              ) : (
                <div className="flex mt-4 ">
                  <QuantitySelector
                    quantity={cartItem.quantity}
                    selectedProduct={cartItem}
                    setQuantity={(newQuantity) => {
                      dispatch(
                        updateQuantity({
                          id: cartItem.id,
                          quantity: newQuantity,
                        })
                      );
                      if (userId) {
                        dispatch(
                          updateQuantityInSupabase({
                            userId: userId,
                            productId: cartItem.id,
                            quantity: newQuantity,
                            price: cartItem.price,
                          })
                        );
                      }
                    }}
                  />
                </div>
              )}
              {/* remove button*/}
              <div className="flex justify-end">
                <button
                  className="text-xs font-bold underline text-pink hover:text-black hover:border-black"
                  onClick={() => {
                    if (userId) {
                      isWishlist
                        ? dispatch(
                            deleteFromWishlistInSupabase({
                              id: cartItem.id,
                              userId: userId,
                            })
                          )
                        : dispatch(
                            showToast({
                              type: "deleteFromCart",
                              message: "delete from cart",
                              product: cartItem,
                            })
                          );
                    } else {
                      isWishlist
                        ? dispatch(deleteFromWishlist(cartItem))
                        : dispatch(
                            showToast({
                              type: "deleteFromCart",
                              message: "delete from cart",
                              product: cartItem,
                            })
                          );
                    }
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
