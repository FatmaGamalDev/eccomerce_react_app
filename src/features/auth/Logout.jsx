import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../toast/Toast-Slice";
import { startLoading, stopLoading } from "../loading/loadingSlice";
import { clearCart } from "../cart/Cart-Slice";
import { signOut } from "./authSlice";

function Logout() {
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
      className="w-full px-4 py-2 mt-2 border rounded-full border-pink text-pink"
    >
      Sign Out
    </button>
  );
}

export default Logout;
