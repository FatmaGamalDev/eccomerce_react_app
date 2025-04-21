import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../features/toast/Toast-Slice";
import { clearCart } from "../../features/cart/Cart-Slice";
import { signOut } from "../../features/auth/authSlice";
import { Loader } from "lucide-react";

function SignOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleSignOut = async () => {
    const resultAction = await dispatch(signOut());
    if (signOut.fulfilled.match(resultAction)) {
      dispatch(clearCart());
      navigate("/signin");
    } else {
      dispatch(showToast({ message: resultAction.payload, type: "error" }));
    }
  };
  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center justify-center w-full px-4 py-2 mt-2 text-black border border-black rounded-full hover:text-pink hover:border-pink"
    >
      <span> Sign Out</span>
      {loading ? <Loader className="ml-2 animate-spin" /> : ""}
    </button>
  );
}

export default SignOutButton;
