import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import NewsSignUpBG from ".././../Assets/newsSignUpBG.png";

function NewsSignup() {
  return (
    <section
      className="flex items-center justify-center w-full bg-cover "
      style={{
        backgroundImage: `url(${NewsSignUpBG})`,
        backgroundPosition: "center top -20px",
      }}
    >
      <div className="flex flex-col items-center justify-center p-2 space-y-4 w-96 md:w-1/2 ">
        <hr />
        <h1 className="w-1/2 text-2xl font-semibold text-center ">
          STAY IN THE KNOW - SIGN UP NOW
        </h1>
        <div className="flex items-center justify-between w-full">
          <input
            className="w-full py-4 mt-0 placeholder-black bg-transparent border-b border-black outline-none placeholder:text-md placeholder:mb-4 focus:border-secondary-500 "
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
    </section>
  );
}

export default NewsSignup;
