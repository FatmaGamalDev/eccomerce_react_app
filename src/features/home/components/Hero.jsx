import React from "react";
import decoration from "../../../Assets/hero/decoration.jpg";
import fragrance from "../../../Assets/hero/fragranceimg.jpg";
import makeup from "../../../Assets/hero/makeup.jpg";
import { ShoppingBag } from "lucide-react";
import Container from "../../../components/ui/Container";

function Hero() {
  return (
    <div className="relative  lg:h-[102vh]  bg-gradient-to-br from-[#e31870]/5 via-[#e31870]/3 to-white ">
      <Container>
        {/* Reduced and more subtle abstract shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-[#e31870]/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-[#e31870]/5 rounded-full mix-blend-multiply filter blur-xl delay-700 opacity-30"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-start h-full py-8">
            {/* Left column - Text content */}
            <div className="space-y-8 mt-4 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-black px-4 py-1  mb-1 self-start ">
                  <ShoppingBag className="w-5 h-5" />
                  Your favorite collections await
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                Create Your
                <span className="block mt-2 text-pink ">
                  {" "}
                  Amazing Looks & Living
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-xl">
                Shop the best handpicked selection of premium lifestyle products
                that transform your everyday experiences into moments of luxury.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <button className=" w-48 main-btn before:bg-softbeige  ">
                  <span className="z-10"> Explore Now</span>
                </button>

                <button className=" w-48 main-btn text-pink hover:text-white bg-transparent before:bg-pink">
                  <span className="z-10"> View Catalog</span>
                </button>
              </div>
            </div>

            {/* Right column - Featured items grid */}
            <div className="hidden lg:grid grid-cols-2 gap-6 relative">
              <div className="transform translate-y-12">
                <div className="grid gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-[#e31870]/10 to-pink-50 rounded-xl mb-4 flex items-center justify-center">
                      <img src={makeup} alt="makeupImage" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-pink-50 to-[#e31870]/10 rounded-xl mb-4 flex items-center justify-center">
                      <img src={decoration} alt="decaorationImage" />
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-purple-50 to-[#e31870]/10 rounded-xl mb-4 flex items-center justify-center">
                      <img src={fragrance} alt="fragranceImage" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
