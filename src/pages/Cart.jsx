import { useSelector } from "react-redux";
import { showToast } from "../rtk/slices/Toast-Slice";
import CartSummary from "../components/cart/CartSummary";
import CartProducts from "../components/cart/CartProducts";
import CartEmpty from "../components/cart/CartEmpty";
import Container from "../components/common/Container";

function Cart() {
  const cartProducts = useSelector((state) => state.cart.cart) ?? [];
  const cartTotal = useSelector((state) => state.cart.cartTotal) ?? 0;
  if (cartProducts.length > 0) {
    return ( 
      <Container className='bg-softbeige'>
      <section className="flex flex-col items-center pb-8 h-max md:items-start bg-softbeige md:flex-row">
          <CartProducts cartProducts={cartProducts} showToast={showToast} />
          <CartSummary cartTotal={cartTotal} />
      </section>
      </Container>
    );
  } else {
    return <CartEmpty />;
  }
}
export default Cart;
