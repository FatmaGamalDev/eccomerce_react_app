import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../rtk/slices/Cart-Slice";
function Cart() {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold text-center my-4 uppercase">MY CART</h1>
      <table className="table">
      
        <tbody>
          {/* row 1 */}
          {cartProducts.map((cartItem) => {
            return (
              <tr>
                <th>
                  <label></label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-16 w-16">
                        <img
                          src={cartItem.images[0]}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cartItem.title}</div>
                      <div className="text-sm opacity-50">{cartItem.brand}</div>
                    </div>
                  </div>
                </td>
                {/* <td>
                  {cartItem.description.slice(0, 60)}
                  <br />

                </td> */}
                <td>

                </td>
                <td>{cartItem.price}</td>
                <th>
                  <button
                    className="btn btn-outline w-[90px] p-[12px] text-xs rounded-full border-pink text-pink hover:text-black hover:border-black hover:bg-white"
                    type="button"
                    onClick={() => {
                      dispatch(deleteFromCart(cartItem));
                    }}
                  >
                    REMOVE
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
