import React, { useState } from "react";
import img1 from "../Assets/banner/main-banner.webp";
import img2 from "../Assets/carousel/clothes-1839935_1280.jpg";
import img3 from "../Assets/carousel/ecommerce-2607114_1280.jpg";

const images = [img1, img2, img3, img2]; 

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-700 ease-in-out"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img, index) => (
          <div key={index} className="min-w-full">
            <img src={img} className="w-full h-96 object-cover" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button
        className="absolute left-20 top-2/3 -translate-y-1/2 bg-pink text-white p-2 w-32 rounded-full"
        onClick={prevSlide}
      >
        SHOP NOW
      </button>

      {/* أزرار التنقل */}
      <button
        className=" w-8 h-8 absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full flex flex justify-center items-center"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full  w-8 h-8 flex justify-center items-center"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
}

export default Slider;
