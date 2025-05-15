import React from "react";

function ProductPrice({ price, discountPercentage }) {
  return (
    <div className="flex flex-col items-start justify-start md:flex-row ">
      <p className="mr-2 text-gray-600 line-through md:mr-4 text-md md:text-lg ">
        ${(price + (price * discountPercentage) / 100).toFixed(2)}
      </p>
      <p className="font-bold text-md md:text-lg">${price}</p>
    </div>
  );
}
export default ProductPrice;
