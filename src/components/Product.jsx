import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/slices/Cart-Slice";
import { showToast } from "../rtk/slices/Toast-Slice";
import WishlistButton from "./product/WishlistButton";
import ProductPrice from "./product/ProductPrice";
import AddToCartButton from "./product/AddToCartButton";

function Product(props) {
  const dispatch = useDispatch();

  const { product } = props;
  return (
    <>
      <div className="card bg-base-100 w-54 shadow-sm h-[28rem] border border-gray-300 ">
        <div className="h-1/2">
          <Link to={`/product/${product.id}`}>
            <figure className="object-cover h-full">
              <img
                className="w-2/3 h-full cursor-pointer"
                src={
                  product.images?.[0] ||
                  product.images?.[1] ||
                  product.images?.[2]
                }
                alt={product.title}
              />
            </figure>
          </Link>
        </div>
        <div className="card-body">
          <h2 className="card-title ">
            {product.title}
            <div className="w-12 text-white badge bg-pink">NEW</div>
          </h2>
          <p>{product.description.slice(0, 60)}</p>
          <div className="justify-end card-actions"></div>
          {/* <Link to={`/product/${product.id}`}>Details</Link> */}
          <ProductPrice
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
          <div className="flex justify-between align-center">
            <AddToCartButton selectedProduct={product} className="w-40" />
            <WishlistButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
