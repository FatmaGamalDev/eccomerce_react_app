import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "./authSlice";
import { updateUserData } from "../user/UserSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../toast/Toast-Slice";

function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    agreeToTerms: true,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // send SignUp data
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      //  sign up with email and password
      const data = await dispatch(
        signUp({ email: formData.email, password: formData.password })
      ).unwrap();
      // save extra user info in supabase users table
      if (data?.user) {
        try {
          const updatedUser = await dispatch(
            updateUserData({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              address: formData.address,
            })
          ).unwrap();
          if (updatedUser) {
            dispatch(
              showToast({
                type: "success",
                message: `Welcome, ${formData.firstName}! Account created.`,
              })
            );
            navigate("/");
          }
        } catch (error) {
          dispatch(
            showToast({ type: "error", message: "User data update failed." })
          );
        }
      }
    } catch (err) {
      console.error("SignUp Error:", err.message);
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="p-6 bg-white sm:w-2/3 ">
        <h1 className="mb-4 text-2xl font-semibold text-center uppercase">
          create an account
        </h1>
        <h6>
          Already have an account?
          <a href="login">
            <span className="underline cursor-pointer text-pink "> Login</span>
          </a>
        </h6>
        <form onSubmit={handleSignUpSubmit}>
          <div className="flex gap-4">
            {/* First Name */}
            <div className="w-1/2">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your first name"
                name="firstName"
                onChange={handleInputChange}
                value={formData.firstName}
                required
              />
            </div>
            {/* Last Name */}
            <div className="w-1/2">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your last name"
                name="lastName"
                onChange={handleInputChange}
                value={formData.lastName}
                required
              />
            </div>
          </div>
          {/* email */}
          <div className="mt-4 mb-4">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </div>

          {/* phone number  */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="Enter your phone number"
                name="phoneNumber"
                onChange={handleInputChange}
                value={formData.phoneNumber}
                required
              />
            </div>
            {/* Address */}
            <div className="w-1/2">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your address"
                name="address"
                onChange={handleInputChange}
                value={formData.address}
                required
              />
            </div>
          </div>

          {/* password */}
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
            <span className="text-[13px]">
              Password must have minimum 6 characters, at least 1 uppercase,
              lowercase & number
            </span>
          </div>

          {/* checkbox feild */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              defaultChecked
              className="h-10 mr-2 rounded-lg accent-black"
            />
            <label className="text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>

          {/* error message */}
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full main-btn">
            <span className="z-10">Create Account & Continue</span>
          </button>

          <p className="relative text-center my-4 text-gray-600 before:content-[''] before:absolute before:w-[45%] before:h-[1px] before:bg-gray-400 before:left-0 before:top-1/2 after:content-[''] after:absolute after:w-[45%]  after:h-[1px] after:bg-gray-400 after:right-0 after:top-1/2">
            or
          </p>

          <p className="my-4 text-2xl font-semibold ">Quick Login</p>
          <div className="flex flex-col items-center justify-center gap-4">
            <button className="w-full rounded-full btn bg-white text-black border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
            <button className=" rounded-full w-full btn bg-black text-white border-[#e5e5e5]">
              <svg
                aria-label="Email icon"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="white"
                  stroke="black"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              Login with Email
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUpPage;
