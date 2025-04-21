import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginState, signIn } from "./authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import QuickLogin from "../../components/ui/QuickLogin";

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loginSuccess, loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ email: formData.email, password: formData.password }));
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate("/");
      dispatch(resetLoginState());
    }
  }, [loginSuccess, navigate, dispatch]);
  return (
    <section className="flex items-center justify-center min-h-screen ">
      <div className="p-6 bg-white sm:w-2/3 lg:w-1/2">
        <h1 className="mb-4 text-2xl font-semibold text-center uppercase">
          Login with email address
        </h1>
        <h6>
          Login with email address or
          <Link href="signUp">
            <span className="text-sm underline cursor-pointer text-pink ">
              create account
            </span>
          </Link>
        </h6>
        <form onSubmit={handleSubmit}>
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
          </div>
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
          {/*error message */}
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full main-btn"  disabled={loading}>
            <span className="z-10">LOG IN</span>
            <span>
              {loading ? <Loader className="ml-2 animate-spin" /> : null}
            </span>
          </button>
          <p className="relative text-center my-4 text-gray-600 before:content-[''] before:absolute before:w-[45%] before:h-[1px] before:bg-gray-400 before:left-0 before:top-1/2 after:content-[''] after:absolute after:w-[45%]  after:h-[1px] after:bg-gray-400 after:right-0 after:top-1/2">
            or
          </p>
         <QuickLogin/>
        </form>
      </div>
    </section>
  );
}

export default SignInPage;
