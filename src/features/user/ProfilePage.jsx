import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./UserSlice";
import SignOutButton from "../../components/common/SignOutButton";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const authUser = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.user.loading);
  const [profileData, setProfileData] = useState(null);

  // Effect to check auth and fetch user data
  useEffect(() => {
    if (!authUser) {
      navigate("/signIn");
      return;
    }

    if (!userData || userData.id !== authUser.id) 
      {
      dispatch(getUserData());
    }
  }, [dispatch, navigate, authUser, userData]);

  // Effect to update profile data
  useEffect(() => {
    if (userData) {
      setProfileData({
        firstName: userData?.firstName ,
        lastName: userData?.lastName ,
        email: userData?.email ,
        address: userData?.address ,
        phoneNumber: userData?.phoneNumber,
      });
    }
  }, [userData]);

  // Skeleton loading 
  if (loading || !profileData) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-white sm:w-2/3 lg:w-1/2 animate-pulse">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="w-40 h-8 mt-4 bg-gray-200 rounded"></div>
            <div className="h-4 mt-2 bg-gray-200 rounded w-60"></div>
          </div>
          <div>
            <div className="w-20 h-4 mb-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 mb-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 mb-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 mb-2 bg-gray-200 rounded"></div>
            <div className="w-full h-6 mb-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-full h-10 bg-gray-200 rounded-full"></div>
        </div>
      </section>
    );
  }

  // Extract the first letter of the first name for display
  const firstLetter = profileData.firstName.charAt(0).toUpperCase();

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white sm:w-2/3 lg:w-1/2">
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
        <p className="relative text-center my-6 text-gray-600 before:content-[''] before:absolute before:w-[45%] before:h-[1px] before:bg-gray-400 before:left-0 before:top-1/2 after:content-[''] after:absolute after:w-[45%] after:h-[1px] after:bg-gray-400 after:right-0 after:top-1/2">
          or
        </p>
        <div className="flex flex-col gap-4">
          <SignOutButton/>
          {/* <button
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
          </button> */}
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;



