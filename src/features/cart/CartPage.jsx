import { useSelector } from "react-redux";
import { showToast } from "../toast/Toast-Slice";
import CartSummary from "./components/CartSummary";
import CartProducts from "./components/CartProducts";
import CartEmpty from "./components/CartEmpty";
import Container from "../../components/ui/Container";
import { useEffect, useState } from "react";

function CartPage() {
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
      <section className="pt-4 bg-lightPink">
        <Container>
          <h1 className="self-start  text-2xl font-semibold uppercase mt-0 mb-4 ml-[18px]">
            Bag Summary ({cartItems} )
          </h1>
          <div className="flex flex-col items-center pb-8 h-max md:items-start bg-lightPink md:flex-row">
            <CartProducts
              cartProducts={cartProducts}
              showToast={showToast}
              isWishlist={false}
            />
            <CartSummary cartTotal={cartTotal} />
          </div>
        </Container>
      </section>
    );
  } else {
    return <CartEmpty />;
  }
}
export default CartPage;
