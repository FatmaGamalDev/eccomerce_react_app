import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

function NewsSignup() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-96 md:w-1/2  p-2 ">
      <hr />
      <h1 className="text-center font-semibold text-2xl w-1/2 ">
        STAY IN THE KNOW - SIGN UP NOW
      </h1>

      <div className="flex items-center justify-between w-full">
        <input
          className="w-full border-b border-black outline-none mt-0 py-4 placeholder-black 
       placeholder:text-md placeholder:mb-4 focus:border-secondary-500  "
          type="email"
          placeholder="Your email address"
        />
        <MdOutlineArrowForwardIos size={28} />
      </div>
      <p className="uppercase text-center text-[13px]">
        By entering your email address you agree to receive marketing emails
        from Huda Beauty. Unsubscribe at any time.
      </p>
      <hr />
    </div>
  );
}

export default NewsSignup;
