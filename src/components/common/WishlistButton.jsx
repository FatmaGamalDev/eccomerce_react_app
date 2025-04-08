import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../features/wishlist/wishlistSlice";
import { Heart } from "lucide-react";

function WishlistButton({ product }) {
  const dispatch = useDispatch();
  let isInWishlist = useSelector((state) =>
    state.wishlist.wishlist.some((item) => item.id === product.id)
  );
  return (
    <button
      className="btn btn-circle"
      onClick={() => {
        if (isInWishlist) {
          dispatch(deleteFromWishlist(product));
          isInWishlist = false;
        } else {
          dispatch(addToWishlist(product));
          isInWishlist = true;
        }
      }}
    >
      <Heart
        className="size-[1.4em]"
        fill={isInWishlist ? "#e31870" : "none"}
        stroke={isInWishlist ? "#e31870" : "currentColor"}
      />
    </button>
  );
}

export default WishlistButton;
