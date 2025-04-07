import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../toast/Toast-Slice";
import { startLoading, stopLoading } from "../loading/loadingSlice";
import { clearCart } from "../cart/Cart-Slice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user) || {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
    address: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSave = () => {
    setIsEditing(false);
  };
  const handleSignOut = async () => {
    dispatch(startLoading());
    const resultAction = await dispatch(signOut());
    if (signOut.fulfilled.match(resultAction)) {
      dispatch(stopLoading());
      dispatch(clearCart());
      navigate("/signin");
    } else {
      dispatch(stopLoading());
      dispatch(showToast({ message: resultAction.payload, type: "error" }));
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 text-center bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-gray-800">
          👋 Welcome, {user.firstName} {user.lastName}!
        </h2>
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 mx-auto mb-4 border rounded-full"
        />
        <div className="mt-4 text-left text-gray-600">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <h4 className="mt-4 font-semibold">Shipping Address:</h4>
          {user.address ? (
            <p>{user.address}</p>
          ) : (
            <p className="text-red-500">No default shipping address</p>
          )}
          {isEditing ? (
            <div className="mt-2">
              <input
                type="text"
                name="address"
                className="w-full mb-2 form-input"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <button onClick={handleSave} className="w-full mt-2 main-btn">
                Save Address
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-3 main-btn"
            >
              Add Default Address
            </button>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-2 mt-6 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
