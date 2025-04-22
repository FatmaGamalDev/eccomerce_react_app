import React, { useEffect, useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

// function CategoryCarousel({ filteredCategories, children }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [categoriesPerView, setCategoriesPerView] = useState(1);
//   const categoryWidth = 304;
//   const updateCategoriesPerView = () => {
//     if (window.innerWidth >= 1024) {
//       setCategoriesPerView(4);
//     } else if (window.innerWidth >= 768) {
//       setCategoriesPerView(3);
//     } else {
//       setCategoriesPerView(1);
//     }
//   };
//   useEffect(() => {
//     updateCategoriesPerView();
//     window.addEventListener("resize", updateCategoriesPerView);
//     return () => window.removeEventListener("resize", updateCategoriesPerView);
//   }, []);

 
//   const maxIndex = Math.max(0, filteredCategories.length - categoriesPerView );

//   const nextSlide = () => setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
//   const prevSlide = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));

//   return (
//     <div className="relative">
//       {/* carousel buttons*/}
//       <div className="flex justify-end gap-4 mb-12">
//         <button onClick={prevSlide} className="circle-btn">
//           <FaArrowLeftLong />
//         </button>
//         <button onClick={nextSlide} className="circle-btn">
//           <FaArrowRightLong />
//         </button>
//       </div>

//       {/* carousel*/}
//       <div className=" min-w-max">
//         <div
//           className="flex gap-4 transition-transform duration-500 ease-in-out"
//           style={{
//             transform: `translateX(-${Math.min(currentIndex, maxIndex) * categoryWidth}px)`,
//           }}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }


function CategoryCarousel({ filteredCategories, children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categoriesPerView, setCategoriesPerView] = useState(1);

  const updateCategoriesPerView = () => {
    if (window.innerWidth >= 1024) {
      setCategoriesPerView(4);
    } else if (window.innerWidth >= 768) {
      setCategoriesPerView(3);
    } else {
      setCategoriesPerView(1);
    }
  };

  useEffect(() => {
    updateCategoriesPerView();
    window.addEventListener("resize", updateCategoriesPerView);
    return () => window.removeEventListener("resize", updateCategoriesPerView);
  }, []);

  const categoryWidth = window.innerWidth >= 1024 ? 304 : window.innerWidth >= 768 ? 240 : 200;

  const maxIndex = Math.max(0, filteredCategories.length - categoriesPerView);

  const nextSlide = () => setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  const prevSlide = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <div className="relative">
      <div className="flex justify-end gap-4 mb-12">
        <button onClick={prevSlide} className="circle-btn">
          <FaArrowLeftLong />
        </button>
        <button onClick={nextSlide} className="circle-btn">
          <FaArrowRightLong />
        </button>
      </div>

      <div className="min-w-max">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${Math.min(currentIndex, maxIndex) * categoryWidth}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default CategoryCarousel;
