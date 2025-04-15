import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  deleteFromWishlist,
} from "../../features/wishlist/WishlistSlice";
import { Heart } from "lucide-react";
import { addToWishlistInSupabase, deleteFromWishlistInSupabase } from "../../features/wishlist/WishlistThunks";
import { deleteFromCartInSupabase } from "../../features/cart/CartThunks";

function WishlistButton({ product, className = "" }) {
  const dispatch = useDispatch();
  let isInWishlist = useSelector((state) =>
    state.wishlist.wishlist.some((item) => item.id === product.id)
  );
  const userId = useSelector((state) =>
    state.auth.user ? state.auth.user.id : null
  );

  return (
    <button
      className={`btn btn-circle ${className}`}
      onClick={(e) => {
        if (isInWishlist) {
          if (userId) {
            dispatch(deleteFromWishlistInSupabase({id:product.id,userId:userId}));
          } else {
            dispatch(deleteFromWishlist(product));
          }
          isInWishlist = false;
        } else {
          if (userId) {
            dispatch(
              addToWishlistInSupabase({ product: product, userId: userId })
            );
          } else {
            dispatch(addToWishlist(product));
          }
          isInWishlist = true;
        }
        e.stopPropagation();
      }}
    >
      <Heart
        strokeWidth={1.25}
        className="size-[1.4em]"
        fill={isInWishlist ? "#e31870" : "none"}
        stroke={isInWishlist ? "#e31870" : "currentColor"}
      />
    </button>
  );
}

export default WishlistButton;
