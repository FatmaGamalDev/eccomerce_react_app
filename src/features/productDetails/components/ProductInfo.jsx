import React from "react";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";

function ProductInfo({ title, brand, description, rating, price, discount }) {
  return (
    <>
      <h1 className="text-2xl font-semibold capitalize">{title}</h1>
      <span className="badge badge-soft badge-neutral">{brand}</span>
      <p className="capitalize text-md font-simibold ">
        <span className="block">Discription:</span>
        {description}
      </p>
      <ProductRating rating={rating} />
      <ProductPrice price={price} discountPercentage={discount} />
    </>
  );
}

export default ProductInfo;
