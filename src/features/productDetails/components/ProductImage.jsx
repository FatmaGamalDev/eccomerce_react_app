import React from 'react'
import ProductImagePlaceholder from "../../../Assets/ImagePlaceholder.jpg";

function ProductImage({ imageUrl, discount, title }) {
  return (
    <div className="relative flex items-center md:h-[420px] justify-center border-2 border-nude rounded-md w-[90%] md:w-[40%] ">
    <small className="absolute top-0 left-0  w-12 text-[16px] font-semibold text-center text-white rounded-sm bg-pink">
    <h6>{`- ${Math.ceil(discount)}% `}</h6>
    </small>
    <img
      className="object-cover p-4 w-ful "
      src={
      imageUrl || ProductImagePlaceholder
      }
      alt={title}
    />
  </div>
    )
}

export default ProductImage