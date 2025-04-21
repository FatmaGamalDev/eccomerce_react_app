import React from "react";
import { useSelector } from "react-redux";
import CartProducts from "../cart/components/CartProducts";
import { showToast } from "../toast/Toast-Slice";
import Container from "../../components/ui/Container";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  return (
    <section className="flex flex-col items-center py-8 mx-auto h-max bg-softbeige">
      <Container className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4  mt-0 mb-4 ml-[18px] ">
          {wishlistItems.length > 0 ? " My Wishlist" : "wish list is empty "}
        </h1>
        <CartProducts
          cartProducts={wishlistItems}
          isWishlist={true}
          showToast={showToast}
        />
      </Container>
    </section>
  );
};
export default WishlistPage;
