import React from "react";
import { FiPlus } from "react-icons/fi";
import PaymentMethods from "./PaymentMethods";

function CartSummary({ cartTotal }) {
  return (
    <div className="w-[90%] flex flex-col flex-grow gap-6 bg-white  rounded-lg  border-black pb-8 p-4 md:border-none md:w-1/3  md:h-full">
      <div className="relative flex flex-col gap-2">
        <label className=" font-semibold md:text-[14px] lg:text-lg">
          Do you have a promo code?
        </label>
        <input type="text" className="border-gray-700 form-input" />
        <FiPlus className="absolute text-2xl top-10 right-4" />
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold uppercase">order summary</h1>
        <div className="flex items-center justify-between">
          <h4 className="font-bold">Total </h4>
          <span className="font-semibold">
            {Number(cartTotal || 0).toFixed(2)}$
          </span>
        </div>
      </div>
      <div>
        <button className="w-full p-[1.5rem] text-white uppercase rounded-full btn bg-pink hover:bg-pink">
          securde checkout
        </button>
      </div>
      <p className="text-center text-gray-600">
        Estimated delivery timeframe 1-2 business days (does not include
        weekends and holidays)
      </p>
      <PaymentMethods />
    </div>
  );
}

export default CartSummary;
