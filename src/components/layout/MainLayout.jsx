import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "../../features/loading/Loader";
import NewsSignup from "../ui/NewsSignup";
import ToastNotification from "../../features/toast/ToastNotification";
import ScrollToTop from "../ui/ScrollToTop";
import { Outlet } from "react-router-dom";
import ScrollToTopButton from "../ui/ScrollToTopButton";
function MainLayout() {
  return (
    <>
      <ToastNotification />
      <ScrollToTop />
      <Navbar />
      <Loader />
      <Outlet />
      <NewsSignup />
      <Footer />
      <ScrollToTopButton/>
    </>
  );
}

export default MainLayout;
