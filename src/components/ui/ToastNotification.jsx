import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../rtk/slices/Toast-Slice";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastNotification() {
  const { message, type, show } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      const toastId = toast[type](message, {
        position: "top-center", // ✅ تغيير الموضع إلى وسط الشاشة العلوي
        autoClose: 3000,
        hideProgressBar: true, // إزالة شريط التقدم
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide, // انتقال سلس
        style: {
          background: "#f5f5f5", // لون الخلفية
          color: "#FF497C", // لون النص
          width: "400px",
          maxWidth: "none",
          borderRadius: "8px", // حواف ناعمة
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // ظل خفيف
          position: "relative",
        },
        icon: (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#FF497C",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            ✔
          </span>
        ),
        closeButton: (
          <button
            onClick={() => dispatch(hideToast())}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.2rem",
              color: "black",
              cursor: "pointer",
              position: "absolute",
              top: "8px",
              right: "12px",
            }}
          >
            ✖
          </button>
        ),
        onClose: () => dispatch(hideToast()),
      });

      return () => {
        toast.dismiss(toastId); // إزالة التوست عند انتهاء المكون
      };
    }
  }, [message, type, show, dispatch]);

  return <ToastContainer />;
}

export default ToastNotification;
