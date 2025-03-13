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
            <img src={img} className="object-cover w-full h-96" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button
        className="absolute w-32 p-2 text-white -translate-y-1/2 rounded-full left-20 top-2/3 bg-pink"
        onClick={prevSlide}
      >
        SHOP NOW
      </button>

      {/* أزرار التنقل */}
      <button
        className="absolute flex items-center justify-center w-8 h-8 p-2 text-white -translate-y-1/2 rounded-full bg-pink left-5 top-1/2 bg-black/50"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute flex items-center justify-center w-8 h-8 p-2 text-white -translate-y-1/2 rounded-full bg-pink right-5 top-1/2 bg-black/50"
        onClick={nextSlide}
      >
        ❯
      </button>
    </div>
  );
}

export default Slider;
