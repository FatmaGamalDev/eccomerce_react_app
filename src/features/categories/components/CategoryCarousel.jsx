
import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const CategoryCarousel = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: {
      perView: 1,
      spacing: 5,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 15 },
      },
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Navigation functions
  const goToPrev = () => {
    instanceRef.current?.prev();
  };

  const goToNext = () => {
    instanceRef.current?.next();
  };

  // Calculate if arrows should be disabled
  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled =
    currentSlide >=
    (instanceRef.current?.track.details.slides.length || 0) -
      instanceRef.current?.options.slides.perView;

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {loaded && instanceRef.current && (
        <div className="flex justify-end gap-4 mb-4">
          <button
            onClick={goToPrev}
            disabled={isPrevDisabled}
            className={`circle-btn ${isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaArrowLeftLong />
          </button>
          <button
            onClick={goToNext}
            disabled={isNextDisabled}
            className={`circle-btn ${isNextDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FaArrowRightLong />
          </button>
        </div>
      )}

      {/* Carousel Container */}
      <div ref={sliderRef} className="keen-slider  ">
        {React.Children.map(children, (child) => (
          <div className="keen-slider__slide h-full">{child}</div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;