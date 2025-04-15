import React from "react";
import { useSelector } from "react-redux";
import CartProducts from "../cart/components/CartProducts";
import { showToast } from "../toast/Toast-Slice";
import Container from "../../components/common/Container";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  return (
    <Container className=" bg-beige">
      <section className="flex flex-col  items-center py-8 h-max  bg-softbeige ">
        <h1 className="text-2xl font-bold mb-4  mt-0 mb-4 ml-[18px] ">
          {wishlistItems.length > 0 ? " My Wishlist" : "wish list is empty "}
        </h1>
        <CartProducts
          cartProducts={wishlistItems}
          isWishlist={true}
          showToast={showToast}
        />
      </section>
    </Container>
  );
};

export default WishlistPage;
