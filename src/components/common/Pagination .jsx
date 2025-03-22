import React, { useState } from "react";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const handleNext = () => {
    setCurrentPage((prevPage) =>
      prevPage + 1 <= totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 > 0 ? prevPage - 1 : prevPage));
  };
  return (
    <div className="flex items-center justify-center gap-6 my-8">
      <button onClick={handlePrev} className="circle-btn">
        <GrPrevious />
      </button>
      <span className="mx-4">
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={handleNext} className="circle-btn">
        <GrNext />
      </button>
    </div>
  );
}

export default Pagination;
