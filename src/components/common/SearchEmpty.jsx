import React from "react";
import { useNavigate } from "react-router-dom";
import SearchEmptyImg from "../../Assets/search_empty.png";

function SearchEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <img src={SearchEmptyImg} alt="Search empty" className="w-1/6 " />
      <h1 className="mt-4 text-2xl font-semibold text-gray-600">
        Your search did not match any products
      </h1>
      <p className="mt-2 text-lg font-medium text-gray-500">
        Try something like:
      </p>
      <p className="mt-1 text-gray-500">• Use more general terms</p>
      <p className="mt-1 text-gray-500">• Check your spelling</p>
      <button
        onClick={() => navigate("/")}
        className="w-32 p-2 mt-6 text-white transition duration-300 rounded-full bg-pink hover:bg-pink-700"
      >
        Go Home
      </button>
    </div>
  );
}

export default SearchEmpty;
