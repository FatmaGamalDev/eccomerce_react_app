import React, { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { hideToast } from "../rtk/slices/Toast-Slice";

function ToastNotification() {
  const { message, type, show } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if(show){
        toast[type](message, {
            duration: 4000,
            position: "top-center",
            style: {
              background: "#f5f5f5",
              color: "#FF497C",
              width: "50rem",
              maxWidth: "none",
            },
            iconTheme: {
              primary: "#FF497C",
              secondary: "#f5f5f5",
            },
          });

          setTimeout(() => {
            dispatch(hideToast())
          }, 4000);
    }
 
  }, [message, type, show, dispatch]);

  return null;
}

export default ToastNotification;
