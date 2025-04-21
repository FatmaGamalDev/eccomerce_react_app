import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./UserSlice";
import SignOutButton from "../../components/ui/SignOutButton";
import Container from "../../components/ui/Container";
import ProfilePageSkeleton from "./components/ProfilePageSkeleton";

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
    if (!userData || userData.id !== authUser.id) {
      dispatch(getUserData());
    }
  }, [dispatch, navigate, authUser, userData]);

  // Effect to update profile data
  useEffect(() => {
    if (userData) {
      setProfileData({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        address: userData?.address,
        phoneNumber: userData?.phoneNumber,
      });
    }
  }, [userData]);

  // Skeleton loading
  if (loading || !profileData) {
    return <ProfilePageSkeleton />;
  }
  // Extract the first letter of the first name for display
  const firstLetter = profileData.firstName.charAt(0).toUpperCase();

  return (
    <Container>
      <section className="flex items-center justify-center w-full py-4">
        <div className="w-11/12 p-6 overflow-auto bg-white shadow-lg sm:w-2/3 md:w-1/2 rounded-2xl sm:p-8 animate-fadeIn">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 text-4xl font-semibold text-white transition-transform duration-300 rounded-full shadow-md sm:w-24 sm:h-24 sm:text-5xl bg-pink hover:scale-105 glow animate-scaleIn">
              {firstLetter}
            </div>
            <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
              My Account
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 mb-6 sm:flex-row sm:gap-4">
            <div className="w-full space-y-4 sm:flex-1">
              <div>
                <p className="text-sm font-medium text-gray-700">Full Name</p>
                <div className="px-4 h-[50px] sm:h-[60px] flex items-center text-gray-500  border border-gray-500 rounded-xl shadow-sm">
                  {profileData.firstName} {profileData.lastName}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <div className="px-4 h-[50px] sm:h-[60px] flex items-center text-gray-500 border border-gray-500 rounded-xl shadow-sm">
                  {profileData.email}
                </div>
              </div>
            </div>
            <div className="w-full space-y-4 sm:flex-1">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Shipping Address
                </p>
                <div className="px-4 h-[50px] sm:h-[60px] flex items-center text-gray-500  border border-gray-500 rounded-xl shadow-sm">
                  {profileData.address}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Phone Number
                </p>
                <div className="px-4 h-[50px] sm:h-[60px] flex items-center text-gray-500  border border-gray-500 rounded-xl shadow-sm">
                  {profileData.phoneNumber}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4">
            <button
              type="button"
              className="w-full py-2 text-sm transition-transform duration-300 rounded-lg main-btn sm:py-3 sm:text-base hover:scale-95"
              onClick={() => navigate("/")}
            >
              <span className="z-10">Continue Shopping</span>
            </button>
          </div>
          <div className="relative my-4 text-center sm:my-6">
            <span className="relative px-4 font-medium text-gray-600 bg-white">
              or
            </span>
            <div className="absolute w-full h-[1px] bg-gray-400 top-1/2"></div>
            <div className="absolute w-2 h-2 -translate-y-1/2 bg-gray-400 rounded-full left-1/4 top-1/2"></div>
            <div className="absolute w-2 h-2 -translate-y-1/2 bg-gray-400 rounded-full right-1/4 top-1/2"></div>
          </div>

          <div className="flex flex-col gap-4">
            <SignOutButton className="w-full py-2 text-sm transition-transform duration-300 rounded-lg main-btn sm:py-3 sm:text-base hover:scale-95" />
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ProfilePage;
