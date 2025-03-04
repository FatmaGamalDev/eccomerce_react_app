import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-Slice";
function Cart() {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>cart products</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">
              <button type="button" class="btn btn-primary">
                DELETE
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((cartItem) => {
            return (
              <tr>
                <th scope="row">{cartItem.id}</th>
                <td>{cartItem.title}</td>
                <td>{cartItem.price}</td>
                <td>{cartItem.brand}</td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => {
                    dispatch(deleteFromCart(cartItem));
                  }}
                >
                  DELETE
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
