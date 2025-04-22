import React from "react";

function ProductPrice({ price, discountPercentage }) {
  return (
    <div className="flex flex-col  md:flex-row items-center justify-center">
      <p className="mr-2 md:mr-4 text-md md:text-lg text-gray-600 line-through ">
        ${(price + (price * discountPercentage) / 100).toFixed(2)}
      </p>
      <p className="text-md  md:text-lg font-bold">${price}</p>
    </div>
  );
}
export default ProductPrice;
