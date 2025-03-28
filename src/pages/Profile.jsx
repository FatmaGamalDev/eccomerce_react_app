import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../rtk/slices/authSlice";
import { useNavigate } from "react-router-dom";

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
    // Handle saving logic here (e.g., dispatch an action)
    setIsEditing(false);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800">👋 Welcome, {user.firstName} {user.lastName}!</h2>
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mb-4 border mx-auto"
        />
        <div className="mt-4 text-gray-600 text-left">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
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
                className="form-input w-full mb-2"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <button onClick={handleSave} className="main-btn w-full mt-2">
                Save Address
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="main-btn mt-3 w-full">
              Add Default Address
            </button>
          )}
        </div>
        <button 
          onClick={handleSignOut} 
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
