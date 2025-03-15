import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShareFromSquare } from "react-icons/fa6";

function ProductReviews() {
  const { productID } = useParams();
  const [reviews, setreviews] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productID}`)
      .then((response) => response.json())
      .then((product) => {
        setreviews(product.reviews);
      });
  }, [productID]);

  return (
    <>
      {/* display the product reviews from the api */}

      {reviews.map((review) => {
        return (
          <div className="border borde-gray-200 border-y flex flex-col space-y-2 p-8">
            <p className="font-semibold text-lg">{review.reviewerName}</p>
            <p className="text-xs font-semibold">Verified Reviewer</p>
            <div className=" flex items-center text-gray-500 text-sm space-x-2">
              <FaShareFromSquare />
              <span > share</span>
            </div>

            {/* display the product rating from the api */}
            <div className="rating rating-xs">
              {Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index + 1}
                  type="radio"
                  name={`rating-${review.reviewerName || index}`}
                  className="mask mask-star-2 bg-black"
                  aria-label={`${index + 1} star`}
                  checked={
                    review.rating
                      ? index + 1 === Math.round(review.rating)
                      : false
                  }
                  readOnly
                />
              ))}
            </div>

            <p className="text-black">{review.comment}</p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet suscipit id ab expedita rem accusamus
              aperiam itaque eaque a natus. Eaque!
            </p>
            <p className="text-gray-500 italic">{review.date.slice(0, 10)}</p>
          </div>
        );
      })}
    </>
  );
}

export default ProductReviews;
