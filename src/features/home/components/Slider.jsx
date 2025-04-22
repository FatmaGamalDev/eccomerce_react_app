import React, { useEffect, useState } from "react";
import img1 from "../../../Assets/banner/main-banner.webp";
import img2 from "../../../Assets/banner/banner2.jpg";
import img3 from "../../../Assets/carousel/clothes-1839935_1280.jpg";

const images = [img1, img2, img3];

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
  //change the slide every 4 seconds automaticly
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden h-[50vh] md:h-[60vh] sm:h-[30vh] ">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="relative h-full min-w-full">
            <img
              src={img}
              className="object-cover w-full h-full"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button className="absolute w-48 main-btn left-20 top-2/3 ">
        <span className="z-10"> SHOP NOW</span>
      </button>

      <button className="slider-btn left-5 top-1/2 " onClick={prevSlide}>
        ❮
      </button>
      <button className="slider-btn right-5 top-1/2" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
}

export default Slider;