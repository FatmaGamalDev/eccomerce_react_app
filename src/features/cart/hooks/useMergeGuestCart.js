import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartInSupabase, fetchCartFromSupabase } from "../CartThunks";
import { setWasGuest } from "../Cart-Slice";

export const useMergeGuestCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const localCart = useSelector((state) => state.cart.cart);
  const wasGuest = useSelector((state) => state.cart.wasGuest);

  // merge the product from local cart with supabase cart if user use the cart as a guest and then signin or sign up
  useEffect(() => {
    //if there is no user logged in return we  hat el cart ele fe el state bas
    if (!user) return;
    dispatch(fetchCartFromSupabase(user.id)).then((res) => {
      if (wasGuest) {
        localCart.forEach((item) => {
          const exists = res.payload?.some(
            (dbItem) => dbItem.product_id === item.id
          );   
          if (!exists) {
            dispatch(
              addToCartInSupabase({
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

export default useMergeGuestCart;