import React from "react";

function ProductPrice({ price, discountPercentage }) {
  return (
    <div className="flex items-center justify-start ">
      <p className="mr-4 text-lg text-gray-600 line-through ">
        ${(price + (price * discountPercentage) / 100).toFixed(2)}
      </p>
      <p className="text-lg font-bold">${price}</p>
    </div>
  );
}
export default ProductPrice;
