import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "./Toast-Slice";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteFromCart} from "../cart/Cart-Slice";
import { deleteFromCartInSupabase } from "../cart/CartThunks";
function ToastNotification() {
  const { message, type, show, product, quantity } = useSelector(
    (state) => state.toast
  );
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  //  object mapping on toast types
  const toastTypes = {
    add: (
      <div className="text-center bg-white text-black w-full max-w-[650px] md:w-[650px] rounded-2xl p-6">
        <h1 className="text-2xl font-semibold uppercase">{message}</h1>
        <hr />
        <div className="flex items-center justify-center w-full gap-8 p-4 my-8 border border-gray-300 rounded-xl">
          {product?.thumbnail && (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="object-cover w-24 h-24 rounded-lg"
            />
          )}
          <div>
            {product?.title && (
              <p className="mb-1 font-semibold">{product.title}</p>
            )}
            <span>{product?.price}$</span>
            <h4>Quantity: {quantity}</h4>
          </div>
        </div>
      </div>
    ),

    deleteFromCart: ({ closeToast }) => (
      <div className="text-center flex flex-col items-center justify-center gap-4 p-4 rounded-xl w-full max-w-[600px] border border-gray-300 my-4">
        <h1 className="md:text-xl text-md ">
          Are you sure you want to delete these items from your cart?
        </h1>
        <div className="flex justify-center w-full gap-4 mt-4">
          <button
            className="w-[45%] px-4 py-2 text-black border-2 border-pink"
            onClick={() => {
              if (user) {
                dispatch(
                  deleteFromCartInSupabase({
                    id: product?.id,
                    userId: user?.id,
                  })
                );
              }
              dispatch(deleteFromCart(product));
              closeToast();
            }}
          >
            Yes
          </button>
          <button
            className="w-[45%] px-4 py-2 text-black border-2 border-black"
            onClick={closeToast}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    success: (
      <div className="text-center  w-full max-w-[600px] md:w-[600px] rounded-2xl p-6">
        <h1 className="text-lg font-bold uppercase">{message}</h1>
      </div>
    ),
    error: (
      <div className="text-center bg-red-100 text-red-800 w-full max-w-[650px] md:w-[650px] rounded-2xl p-6 border border-red-300 shadow">
        <h1 className="text-2xl font-bold uppercase">{message}</h1>
      </div>
    ),
  };

  useEffect(() => {
    // Function to show the toast if show equals true and style the toast container
    if (show) {
      const toastId = toast(
        toastTypes[type] || (
          <div className="text-center text-red-600">There is an error</div>
        ),
        {
          position: "top-center",
          autoClose: type === "deleteFromCart" ? false : 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Slide,
          style: {
            background: "#ffffff",
            color: "black",
            width: "95%",
            maxWidth: "650px",
            borderRadius: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: "200px",
            padding: "0 16px",
          },
          onClose: () => dispatch(hideToast()),
        }
      );
      return () => toast.dismiss(toastId);
    }
  }, [message, type, show, product, dispatch]);

  return <ToastContainer />;
}

export default ToastNotification;
