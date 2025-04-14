import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../features/toast/Toast-Slice";
import { startLoading, stopLoading } from "../../features/loading/loadingSlice";
import { clearCart } from "../../features/cart/Cart-Slice";
import { signOut } from "../../features/auth/authSlice";

function SignOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    dispatch(startLoading());
    const resultAction = await dispatch(signOut());
    if (signOut.fulfilled.match(resultAction)) {
      dispatch(stopLoading());
      dispatch(clearCart());
      navigate("/signin");
    } else {
      dispatch(stopLoading());
      dispatch(showToast({ message: resultAction.payload, type: "error" }));
    }
  };
  return (
    <button
      onClick={handleSignOut}
      className="w-full px-4 py-2 flex items-center justify-center mt-2 border rounded-full border-black text-black hover:text-pink hover:border-pink"
    >
      <span> Sign Out</span>
    </button>
  );
}

export default SignOutButton;
