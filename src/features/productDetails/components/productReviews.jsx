import { FaShareFromSquare } from "react-icons/fa6";
import { ThumbsDown, ThumbsUp } from "lucide-react";

function ProductReviews({reviews}) {

  return (
    <div className=" border borde-gray-200 border-y lg:border lg:border-black lg:w-[75%] mb-8">
      {/* display the product reviews from the api */}
      {reviews?.map((review) => {
        return (
          <>
          <div className="flex justify-between lg:w-full lg:self-center ">
        <div className="flex flex-col p-8 space-y-2">
        <p className="text-lg font-semibold">{review.reviewerName}</p>
            <p className="text-xs font-semibold">Verified Reviewer</p>
         
            {/* display the product rating from the api */}
            <div className="rating rating-xs">
              {Array.from({ length: 5 }, (_, index) => (
                <input
                  key={index + 1}
                  type="radio"
                  name={`rating-${review.reviewerName || index}`}
                  className="bg-black mask mask-star-2"
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
            <p className="italic text-gray-500">{review.date.slice(0, 10)}</p>
        </div>

        {/*review reacts and share  */}
            <div className="flex flex-col justify-center gap-2 mr-4 ">
            <div className="flex items-center space-x-2 text-sm text-gray-500 ">
              <FaShareFromSquare />
              <span > share</span>
            </div>
          <div className="flex items-center justify-center gap-[8px] text-sm text-gray-500">
         <div className="flex items-center ">
         <ThumbsUp size={20}/>
         <span  className="mt-[6px]">5</span>
         </div>
          <div className="flex items-center">
          <ThumbsDown size={20}  className="mt-[12px]" />
          <span  className="mt-[6px]">0</span>
          </div>
          </div>
            </div>
          </div>
          <hr className="w-[95%] mx-auto"/>
          </> );
      } )}
    </div>
  );
}

export default ProductReviews;
