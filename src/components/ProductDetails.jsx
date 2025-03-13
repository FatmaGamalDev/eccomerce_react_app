import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsSignup from "./NewsSignup";
import ProductReviews from "./productReviews";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/slices/Cart-Slice";
import toast from "react-hot-toast";
import { showToast } from "../rtk/slices/Toast-Slice";

function ProductDetails() {
  const { productID } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productID}`)
      .then((response) => response.json())
      .then((product) => {
        setProductDetails(product);
        setRating(product.reviews?.[2].rating);
      });
  }, [productID]);

  return (
    <>
      <div className="flex flex-col gap-2 p-4 md:flex-row">
        <div className="relative mx-1 mt-4">
          <div className="absolute top-0 left-0 w-12 badge badge-secondary">
            NEW
          </div>
        </div>
        <div className="w-[80%]">
        <img
          className="w-84 md:w-1/2 md:h-84"
          src={
            productDetails.images?.[0] ||
            productDetails.images?.[1] ||
            productDetails.images?.[3]
          }
          alt={productDetails.title}
        />
        </div>
        
        {/*display product informations */}
        <div className="flex-col space-y-4 md:mt-10 ">
          <div className="text-2xl font-semibold capitalize">
            {productDetails.title}
          </div>
          <span className="badge badge-soft badge-neutral" > {productDetails.brand}
          </span>
          <div className="capitalize text-md ">
            <p>Discription:</p>
            {productDetails.description}
          </div>
          {/* get the product rating from the api */}
          <div className="rating rating-sm">
            {Array.from({ length: 5 }, (_, index) => (
              <input
                key={index + 1}
                type="radio"
                name="rating-10"
                className="bg-black mask mask-star-2"
                aria-label={`${index + 1} star`}
                checked={index + 1 === Math.round(rating)}
                readOnly
              />
            ))}
          </div>
          <div className="flex items-center justify-start ">
            <p className="mr-4 text-lg text-gray-600 line-through ">
              $
              {(
                productDetails.price +
                (productDetails.price * productDetails.discountPercentage) / 100
              ).toFixed(2)}
            </p>

            <p className="text-lg">${productDetails.price}</p>
          </div>

          <div className="flex justify-between align-center">
            <button
              className="w-64 btn btn-secondary hover:bg-secondary"
              onClick={() => {dispatch(addToCart(productDetails))
                dispatch(showToast({message:"Product Added Successfully",type:"success"}))
              }
              }
            >
              AddToCart
            </button>
            <button className="btn btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-[1.2em]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
            <hr />
          </div>
        </div>
      </div>
    
      {/* -------------------------banner1------------------- */}
      <div className="flex items-center justify-center w-full my-8 text-xl uppercase bg-beige h-28">
        reviews & questions
      </div>
      <ProductReviews />
      <div className="flex flex-col items-center justify-center w-full py-12 my-8 space-y-2 bg-nude h-28">
        <h1 className="font-bold">#HUDABEAUTIES</h1>
        <p className="text-center">
          Show us your looks and tag @hudabeauty #hudabeauties for a chance to
          be featured!
        </p>
      </div>
<div className="flex items-center justify-center">
<NewsSignup />
</div>
    </>
  );
}

export default ProductDetails;
