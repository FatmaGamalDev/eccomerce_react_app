import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistInSupabase,
  fetchWishlistFromSupabase,
} from "../WishlistThunks";
import { setWasGuest } from "../WishlistSlice";

export const useMergeGuestWishlist = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const localWishlist = useSelector((state) => state.wishlist.wishlist);
  const wasGuest = useSelector((state) => state.wishlist.wasGuest);

  // merge the product from local Wishlist with supabase Wishlist if user use the Wishlist as a guest and then signin or sign up
  useEffect(() => {
    if (!user) return;

    dispatch(fetchWishlistFromSupabase(user.id)).then((res) => {
      if (wasGuest) {
        localWishlist.forEach((item) => {
          const exists = res.payload?.some(
            (dbItem) => dbItem.product_id === item.id
          );
          if (!exists) {
            dispatch(
              addToWishlistInSupabase({
                product: item,
                userId: user.id,
              })
            );
          }
        });

        dispatch(setWasGuest(false));
      }
    });
  }, [user]);
};

export default useMergeGuestWishlist;
