import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsSignup from "./NewsSignup";
import ProductReviews from "./productReviews";

// import { ShareFat } from "@phosphor-icons/react";

function ProductDetails() {
  const { productID } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [rating, setRating] = useState(0);

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
      <div className="flex flex-col gap-2  p-4 md:flex-row">
        <div className="relative  mt-4 mx-1">
          <div className="badge badge-secondary w-12  absolute top-0 left-0">
            NEW
          </div>
        </div>
        <img
          className="w-84 md:w-1/2 md:h-84"
          src={
            productDetails.images?.[0] ||
            productDetails.images?.[1] ||
            productDetails.images?.[3]
          }
          alt={productDetails.title}
        />
        {/*display product informations */}
        <div className="flex-col space-y-4 md:mt-10 ">
          <div className="text-2xl capitalize font-semibold">
            {productDetails.title}
          </div>
          <div className="text-md capitalize ">
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
                className="mask mask-star-2 bg-black"
                aria-label={`${index + 1} star`}
                checked={index + 1 === Math.round(rating)}
                readOnly
              />
            ))}
          </div>
          <div className="flex justify-start items-center ">
            <p className="text-lg line-through text-gray-600 mr-4 ">
              $
              {(
                productDetails.price +
                (productDetails.price * productDetails.discountPercentage) / 100
              ).toFixed(2)}
            </p>

            <p className="text-lg">${productDetails.price}</p>
          </div>

          <div className="flex align-center justify-between">
            <button
              className="btn btn-secondary w-64 hover:bg-secondary"
              // onClick={() => dispatch(addToCart(product))}
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
      {/* <div className="bg-softbeige w-full h-28 flex justify-center items-center text-sm uppercase my-8">
       Login to Huda’s Loyalty club to earn up to 22 points. Not a member? Sign up      </div> */}
      {/* -----------------------FQA---------------- */}
      {/* <div className="collapse bg-red-100 border-base-300 border">
  <input type="checkbox" />
  <div className="collapse-title font-semibold">How do I create an account?</div>
  <div className="collapse-content text-sm">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </div>
</div> */}
      {/* -------------------------banner1------------------- */}
      <div className="bg-beige w-full h-28 flex justify-center items-center text-xl uppercase my-8">
        reviews & questions
      </div>
      <ProductReviews />
      <div className="bg-nude w-full h-28 flex flex-col justify-center items-center py-12 my-8 space-y-2">
        <h1 className="font-bold">#HUDABEAUTIES</h1>
        <p className="text-center">
          Show us your looks and tag @hudabeauty #hudabeauties for a chance to
          be featured!
        </p>
      </div>
<div className="flex justify-center items-center">
<NewsSignup />

</div>
    </>
  );
}

export default ProductDetails;
