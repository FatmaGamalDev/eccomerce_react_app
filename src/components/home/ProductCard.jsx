import React from "react";
import { Link } from "react-router-dom";
import ProductPrice from "../product/ProductPrice";
import AddToCartButton from "../common/AddToCartButton";

function ProductCard({ product }) {
  return (
    <div className=" relative w-full border border-gray-300 shadow-md card sm:w-64 md:w-72 lg:w-[280px] bg-base-100">
      <figure className=" w-[80%] h-[80%] bg-white aspect-square self-center">
        <Link to={`/product/${product.id}`}
>
          <div className="absolute left-0 w-16 px-2 py-1 text-lg text-white bg-red-200 border-none rounded-none badge top-3">
            <h6>{`- ${Math.ceil(product.discountPercentage)}% `}</h6>
          </div>
          <img
            className="object-cover w-full h-full rounded-t-lg"
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.title}
          />
        </Link>
      </figure>
      <hr className="w-[90%] self-center"></hr>
      <div className="p-[12px] card-body">
        <h2 className="text-gray-800 card-title min-h-[48px] line-clamp-2">
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <ProductPrice
          price={product.price}
          discountPercentage={product.discountPercentage}
        />

        <div className="flex justify-between mt-auto flex-nowrap card-actions">
          <AddToCartButton
            selectedProduct={product}
            fromDetails={true}
            quantity={1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
