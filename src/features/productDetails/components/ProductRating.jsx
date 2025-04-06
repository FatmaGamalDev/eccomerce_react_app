import React from 'react'

function ProductRating({ rating }) {
  return (
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
  </div>  )
}

export default ProductRating