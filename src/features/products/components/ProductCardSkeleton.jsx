import React from "react";

function ProductCardSkeleton() {
  return (
    <div className="relative w-full  shadow-md card lg:w-[96%] bg-gray-200  animate-pulse">
      <figure className="w-[80%] h-[80%]  aspect-square self-center bg-gray-200"></figure>
      <hr className="w-[90%] self-center mt-2" />
      <div className="p-[12px] card-body bg-white w-full">
        <h2 className="text-gray-800 card-title h-[30px]  bg-gray-200 rounded-md"></h2>
        <p className="text-sm text-gray-600 bg-gray-200 h-[40px]  rounded-md w-[80%]"></p>
        <div className="flex justify-between w-8 bg-gray-200 h-[28px] w-[150px] rounded-md"></div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
