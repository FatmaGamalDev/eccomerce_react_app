import React from "react";
import decoration from "../../../Assets/hero/decoration.jpg";
import fragrance from "../../../Assets/hero/fragranceimg.jpg";
import makeup from "../../../Assets/hero/makeup.jpg";
import { ShoppingBag } from "lucide-react";
import Container from "../../../components/ui/Container";

function Hero() {
  return (
    <div className="relative  lg:h-[102vh] bg-gradient-to-br from-[#FFF7F7] to-pink-50  ">
      <Container>
        {/* Reduced and more subtle abstract shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-[#e31870]/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-[#e31870]/5 rounded-full mix-blend-multiply filter blur-xl delay-700 opacity-30"></div>
        </div>
        <div className="container relative h-full px-4 mx-auto">
          <div className="grid items-start h-full gap-12 py-8 lg:grid-cols-2">
            {/* Left column - Text content */}
            <div className="mt-4 space-y-8 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-white rounded-full ">
                <span className="inline-flex items-center self-start gap-2 px-4 py-1 mb-1 text-sm font-medium text-black ">
                  <ShoppingBag className="w-5 h-5" />
                  Your favorite collections await
                </span>
              </div>
              <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                Create Your
                <span className="block mt-2 text-pink">
                  Amazing Looks & Living
                </span>
              </h1>
              <p className="max-w-xl text-[16px] text-gray-900">
                Discover our  selection of premium lifestyle products
                that transform your everyday experiences into moments of luxury.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <button className="w-48 main-btn before:bg-softbeige">
                  <span className="z-10"> Explore Now</span>
                </button>
                <button className="w-48 bg-transparent main-btn text-pink hover:text-white before:bg-pink">
                  <span className="z-10"> View Catalog</span>
                </button>
              </div>
            </div>

            {/* Right column - Featured items grid */}
            <div className="relative hidden grid-cols-2 gap-6 lg:grid">
              <div className="transform translate-y-12">
                <div className="grid gap-6">
                  <div className="p-6 transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
                    <div className="aspect-square bg-gradient-to-br from-[#e31870]/10 to-pink-50 rounded-xl mb-4 flex items-center justify-center">
                      <img src={makeup} alt="makeupImage" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid gap-6">
                  <div className="p-6 transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
                    <div className="aspect-square bg-gradient-to-br from-pink-50 to-[#e31870]/10 rounded-xl mb-4 flex items-center justify-center">
                      <img
                        src={fragrance}
                        alt="fragranceImage"
                        className="w-48"
                      />
                    </div>
                  </div>
                  <div className="p-6 transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
                    <div className="aspect-square bg-gradient-to-br from-purple-50 to-[#e31870]/10 rounded-xl mb-4 flex items-center justify-center">
                      <img src={decoration} alt="decaorationImage" />
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
