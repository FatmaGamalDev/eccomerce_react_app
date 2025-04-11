import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "./UserSlice";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  const userData = useSelector((state) => state.user.userData);

  // Get user data from supabase
  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  // Use effect to set profile data when user data is available
  useEffect(() => {
    if (userData) {
      setProfileData({
        firstName: userData?.firstName || "John",
        lastName: userData?.lastName || "Doe",
        email: userData?.email || "john.doe@example.com",
        address: userData?.address || "123 Main St, City, Country",
        phoneNumber: userData?.phoneNumber || "+1 123-456-7890",
      });
      setLoading(false);
    } else {
      setLoading(true);
      
    }
  }, [userData]);

  if (!userData) {
    navigate("/signIn");
    return null; // Prevents rendering the profile page if no userData
  }



  // Get first letter of username for avatar
  const firstLetter = profileData.firstName.charAt(0).toUpperCase();

  return (<section className="flex items-center justify-center min-h-screen">
    <div className="p-6 bg-white sm:w-2/3 lg:w-1/2">
      {/* Avatar and Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-white transition-transform duration-300 rounded-full shadow-md bg-gradient-to-r from-pink to-purple-600 hover:scale-105">
          {firstLetter}
        </div>
        <h1 className="mt-4 font-serif text-3xl font-semibold tracking-wide text-center text-gray-800">
          My Account
        </h1>
        <h6 className="mt-1 text-sm italic text-center text-gray-500">
          Curate Your Shopping Experience
        </h6>
      </div>
      {/* Profile Data (Replaced Form with Divs) */}
      <div>
        <div className="mt-4 mb-4">
          <p className="form-label">Full Name</p>
          <div className="form-input">{profileData.firstName}</div>
        </div>
        <div className="mb-4">
          <p className="form-label">Email</p>
          <div className="form-input">{profileData.email}</div>
        </div>
        <div className="mb-4">
          <p className="form-label">Shipping Address</p>
          <div className="form-input">{profileData.address}</div>
        </div>
        <div className="mb-4">
          <p className="form-label">Phone Number</p>
          <div className="form-input">{profileData.phoneNumber}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-4">
        <button
          type="button"
          className="w-full main-btn"
          onClick={() => navigate("/")}
        >
          <span className="z-10">Continue Shopping</span>
        </button>
      </div>
      {/* Divider */}
      <p className="relative text-center my-6 text-gray-600 before:content-[''] before:absolute before:w-[45%] before:h-[1px] before:bg-gray-400 before:left-0 before:top-1/2 after:content-[''] after:absolute after:w-[45%] after:h-[1px] after:bg-gray-400 after:right-0 after:top-1/2">
        or
      </p>
      {/* Account Actions */}
      <div className="flex flex-col gap-4">
        <button
          className="w-full rounded-full btn bg-black text-white border-[#e5e5e5]"
          onClick={() => navigate("/signout")}
        >
          <svg
            aria-label="Sign out icon"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14 5-5-5-5m5 5H11" />
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  </section>
  );
}

export default Profile;
