import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProducts from "../components/cart/CartProducts";
import { showToast } from "../rtk/slices/Toast-Slice";
import Container from "../components/common/Container";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  return (
    <Container className='bg-softbeige'>
      <section className="flex flex-col  items-center py-8 h-max  bg-softbeige ">
         <h1 className="text-2xl font-bold mb-4  mt-0 mb-4 ml-[18px] ">My Wishlist</h1>
          <CartProducts cartProducts={wishlistItems} isWishlist={true}  showToast={showToast} />
      </section>
      </Container>
  );
};

export default Wishlist;
