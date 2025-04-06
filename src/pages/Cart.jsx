import { useSelector } from "react-redux";
import { showToast } from "../features/toast/Toast-Slice";
import CartSummary from "../features/cart/components/CartSummary";
import CartProducts from "../features/cart/components/CartProducts";
import CartEmpty from "../features/cart/components/CartEmpty";
import Container from "../components/common/Container";
import { useEffect, useState } from "react";

function Cart() {
  const cartProducts = useSelector((state) => state.cart.cart) || [];
  const cartTotal = useSelector((state) => state.cart.cartTotal) || 0;
  //Calculate the total number of items in the cart
  const [cartItems, setCartItems] = useState(0);
  useEffect(() => {
    const totalQuantity = cartProducts.reduce(
      (total, cartProduct) => total + cartProduct.quantity,
      0
    );
    setCartItems(totalQuantity);
  }, [cartProducts]);

  if (cartProducts.length > 0) {
    return (
      <Container className="bg-softbeige ">
        <section className="py-4">
          <h1 className="self-start  text-2xl font-semibold uppercase mt-0 mb-4 ml-[18px]">
            Bag Summary ({cartItems} )
          </h1>
          <div className="flex flex-col items-center pb-8 h-max md:items-start bg-softbeige md:flex-row">
            <CartProducts
              cartProducts={cartProducts}
              showToast={showToast}
              isWishlist={false}
            />
            <CartSummary cartTotal={cartTotal} />
          </div>
        </section>
      </Container>
    );
  } else {
    return <CartEmpty />;
  }
}
export default Cart;
