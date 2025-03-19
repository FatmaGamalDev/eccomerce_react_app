// import React from "react";
// import { Link } from "react-router-dom";
// import WishlistButton from "../ui/WishlistButton";
// import ProductPrice from "../product/ProductPrice";
// import AddToCartButton from "../common/AddToCartButton";

// function ProductCard(props) {
//   const { product } = props;
//   return (
//     <>
//       <div className="card bg-base-100 w-54 shadow-sm h-[28rem] border border-gray-300 ">
//         <div className="relative h-1/2">
//           <Link to={`/product/${product.id}`}>
//           <div className="absolute w-12 text-lg font-semibold text-green-600 badge w-max top-4 left-2">In Stock</div>

//             <figure className="object-cover h-full">
//               <img
//                 className="w-2/3 h-full cursor-pointer"
//                 src={
//                   product.images?.[0] ||
//                   product.images?.[1] ||
//                   product.images?.[2]
//                 }
//                 alt={product.title}
//               />
//             </figure>
//           </Link>
//         </div>
//         <div className="card-body">
//           <h2 className="card-title min-h-max">
//             {product.title}
//           </h2>
//           <p className="h-[48px] overflow-hidden">{product.description.slice(0, 60)}</p>
//           {/* <Link to={`/product/${product.id}`}>Details</Link> */}
//           <ProductPrice
//             price={product.price}
//             discountPercentage={product.discountPercentage}
//           />
//           <div className="flex justify-between align-center">
//             <AddToCartButton selectedProduct={product} fromDetails={true} quantity={1}  className="w-40" />
//             <WishlistButton />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default  ProductCard;


import React from "react";
import { Link } from "react-router-dom";
import WishlistButton from "../ui/WishlistButton";
import ProductPrice from "../product/ProductPrice";
import AddToCartButton from "../common/AddToCartButton";

function ProductCard({ product }) {
  return (
    <div className="w-full border border-gray-300 shadow-md card sm:w-64 md:w-72 lg:w-[280px] bg-base-100">
      
      {/* صورة المنتج */}
      <figure className="relative w-full bg-gray-100 aspect-square">
        <Link to={`/product/${product.id}`}>
          <div className="absolute left-0 px-2 py-1 text-sm text-white bg-green-600 border-none rounded-none badge top-3">
            In Stock
          </div>
          <img
            className="object-cover w-full h-full rounded-t-lg"
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.title}
          />
        </Link>
      </figure>

      {/* محتوى البطاقة */}
      <div className="card-body">
        <h2 className="text-gray-800 card-title min-h-[48px] line-clamp-2">{product.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

        {/* السعر */}
        <ProductPrice price={product.price} discountPercentage={product.discountPercentage} />

        {/* أزرار العمليات */}
        <div className="flex justify-between mt-auto card-actions">
          <AddToCartButton
            selectedProduct={product}
            fromDetails={true}
            quantity={1}
            className="flex-1 btn "
          />
          <WishlistButton className="ml-2 btn btn-outline" />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
