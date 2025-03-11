import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../rtk/slices/Cart-Slice";
function Cart() {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label></label>
            </th>
            <th>Name</th>
            <th>description</th>
            <th>price</th>
            <th>details</th>
          </tr>
        </thead>
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
                <td>
                  {cartItem.description.slice(0, 60)}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>{cartItem.price}</td>
                <th>
                  <button
                    className="btn btn-outline btn-error"
                    type="button"
                    onClick={() => {
                      dispatch(deleteFromCart(cartItem));
                    }}
                  >
                    DELETE
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
