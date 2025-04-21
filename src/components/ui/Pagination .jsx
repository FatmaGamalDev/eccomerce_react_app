import React from "react";
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
  const handlePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex items-center justify-center gap-6 my-8">
      <button onClick={handlePrev} className="circle-btn">
        <GrPrevious />
      </button>
      {/* Create an array from 1 to totalPages */}
      {Array.from({ length: totalPages }, (_, index) => {
        let page = index + 1;
        return (
          <button
            key={page}
            onClick={() => handlePage(page)}
            className={` ${currentPage === page ? "activePage" : ""} relative text-lg`} 
          >
            {page}
          </button>
        
        );
      })}  
      <button onClick={handleNext} className="circle-btn">
        <GrNext />
      </button>
    </div>
  );
}

export default Pagination;
