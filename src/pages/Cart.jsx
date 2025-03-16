import { useSelector } from "react-redux";
import { showToast } from "../rtk/slices/Toast-Slice";
import CartSummary from "../components/cart/CartSummary";
import CartProducts from "../components/cart/CartProducts";
import CartEmpty from "../components/cart/CartEmpty";

function Cart() {
  const cartProducts = useSelector((state) => state.cart.cart) || [];
  const cartTotal = useSelector((state) => state.cart.cartTotal) || 0;
  if(cartProducts.length>0){
    return (
      <div className="flex flex-col items-center">
        <CartProducts cartProducts={cartProducts} showToast={showToast}  />
        <CartSummary cartTotal={cartTotal} />
      </div>
    );
  }
  else{
    return(
      <CartEmpty/>
    )
  }

}
export default Cart;
