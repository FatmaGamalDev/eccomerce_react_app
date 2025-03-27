import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../rtk/slices/Toast-Slice";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteFromCart } from "../../rtk/slices/Cart-Slice";

function ToastNotification() {
  const { message, type, show, product, quantity } = useSelector(
    (state) => state.toast
  );
  const dispatch = useDispatch();
  //  object mapping on toast types
  const toastTypes = {
    add: (
      <div className="text-center ">
        <h1 className="text-2xl font-semibold uppercase">{message}</h1>
        <hr />
        <div className="flex items-center justify-center gap-8 p-4 rounded-xl w-[600px] border border-gray-300 my-8">
          {product?.images?.[0] && (
            <img
              src={product.images[0]}
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

    delete: ({ closeToast }) => (
      <div className=" text-center flex flex-col items-center justify-center gap-4 p-4 rounded-xl w-[600px] border border-gray-300 my-4">
        <h1 className="text-xl ">
          Are you sure you want to delete these items from your cart ?{" "}
        </h1>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="w-48 px-4 py-2 text-black border-2 border-pink"
            onClick={() => {
              dispatch(deleteFromCart(product));
              closeToast();
            }}
          >
            Yes
          </button>
          <button
            className="w-48 px-4 py-2 text-black border-2 border-black "
            onClick={closeToast}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
  };
  useEffect(() => {
    //function to show the toast if the show equal true and style the toast container
    if (show) {
      const toastId = toast(
        toastTypes[type] || (
          <div className="text-center text-red-600"> There is an error</div>
        ),
        {
          position: "top-center",
          autoClose: type === "delete" ? false : 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Slide,
          style: {
            background: "#ffffff",
            color: "black",
            width: "650px",
            maxWidth: "none",
            borderRadius: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            position: "relative",
            top: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          onClose: () => dispatch(hideToast()),
        }
      );
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [message, type, show, product, dispatch]);

  return <ToastContainer />;
}

export default ToastNotification;
