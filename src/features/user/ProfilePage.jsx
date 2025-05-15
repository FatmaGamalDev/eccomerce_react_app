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

  useEffect(() => {
    if (!authUser) {
      navigate("/signIn");
      return;
    }
    if (!userData || userData.id !== authUser.id) {
      dispatch(getUserData());
    }
  }, [dispatch, navigate, authUser, userData]);

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

  if (loading || !profileData) {
    return <ProfilePageSkeleton />;
  }

  const firstLetter = profileData.firstName.charAt(0).toUpperCase();

  return (
    <Container>
      <section className="flex items-center justify-center w-full py-6">
        <div
          role="region"
          aria-label="User profile information"
          className="w-11/12 px-4 py-6 transition-shadow duration-300 shadow-lg xs:px-3 sm:px-6 md:px-8 lg:px-10 rounded-2xl sm:p-8 hover:shadow-xl animate-fadeIn"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 text-4xl font-semibold text-white transition-transform duration-300 rounded-full shadow-md sm:w-24 sm:h-24 sm:text-5xl bg-pink hover:scale-105 glow animate-scaleIn">
              {firstLetter}
            </div>
            <h1 className="mt-4 font-sans text-2xl font-bold tracking-tight text-gray-800 xs:text-3xl sm:text-4xl lg:text-5xl">
              My Account
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 mb-8 sm:flex-row sm:gap-6">
            <div
              className="w-full space-y-4 sm:flex-1 animate-fadeIn"
              style={{ animationDelay: "0.1s" }}
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">Full Name</p>
                <div className="px-3 py-2 min-h-[50px] sm:min-h-[60px] flex items-center text-gray-600 border border-gray-300 rounded-xl shadow-sm hover:border-pink-400 hover:shadow-md transition-all duration-200 truncate">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  {profileData.firstName} {profileData.lastName}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Email</p>
                <div className="px-3 py-2 min-h-[50px] sm:min-h-[60px] flex items-center text-gray-600 border border-gray-300 rounded-xl shadow-sm hover:border-pink-400 hover:shadow-md transition-all duration-200 truncate">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l9 6 9-6m0 12H3V8h18v12z"
                    ></path>
                  </svg>
                  {profileData.email}
                </div>
              </div>
            </div>
            <div
              className="w-full space-y-4 sm:flex-1 animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Shipping Address
                </p>
                <div className="px-3 py-2 min-h-[50px] sm:min-h-[60px] flex items-center text-gray-600 border border-gray-300 rounded-xl shadow-sm hover:border-pink-400 hover:shadow-md transition-all duration-200 line-clamp-2">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    ></path>
                  </svg>
                  {profileData.address}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Phone Number
                </p>
                <div className="px-3 py-2 min-h-[50px] sm:min-h-[60px] flex items-center text-gray-600 border border-gray-300 rounded-xl shadow-sm hover:border-pink-400 hover:shadow-md transition-all duration-200 truncate">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  {profileData.phoneNumber}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4">
            <button
              type="button"
              className="w-full py-2 text-sm transition-transform duration-300 rounded-lg main-btn sm:py-3 sm:text-base hover:scale-95 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              onClick={() => navigate("/")}
            >
              <span className="z-10">Continue Shopping</span>
            </button>
          </div>
          <div className="relative my-4 text-center sm:my-6">
            <div className="absolute w-[calc(50%-2rem)] h-[1px] bg-gray-400 top-1/2 left-0"></div>
            <span className="relative px-4 font-medium text-gray-600 bg-white">
              or
            </span>
            <div className="absolute w-[calc(50%-2rem)] h-[1px] bg-gray-400 top-1/2 right-0"></div>
          </div>
          <div className="flex flex-col gap-4">
            <SignOutButton className="w-full py-2 text-sm transition-transform duration-300 main-btn sm:py-3 sm:text-base hover:scale-95 focus:ring-2 focus:ring-pink-500 focus:outline-none" />
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ProfilePage;
