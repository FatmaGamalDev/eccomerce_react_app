import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/slices/Cart-Slice";
import toast from "react-hot-toast";

function Product(props) {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    toast.success("Product Added Successfully", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#f5f5f5",
        color: "#FF497C",
        width: "50rem",
        maxWidth: "none",
      },
      iconTheme: {
        primary: "#FF497C",
        secondary: "#f5f5f5",
      },
    });
  };
  const { product } = props;
  return (
    <>
      <div className="card bg-base-100 w-54 shadow-sm h-[28rem] border border-gray-200 ">
        <div className="h-1/2">
          <Link to={`/product/${product.id}`}>
            <figure className="h-full object-cover">
              <img
                className="h-full w-2/3 cursor-pointer"
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
            <div className="badge badge-secondary w-12">NEW</div>
          </h2>
          <p>{product.description.slice(0, 60)}</p>
          <div className="card-actions justify-end"></div>
          {/* <Link to={`/product/${product.id}`}>Details</Link> */}
          <div className="flex justify-between items-center ">
            <p className="text-lg line-through text-gray-600">
              $
              {(
                product.price +
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
            </p>

            <p className="text-lg">${product.price}</p>
          </div>
          <div className="flex align-center justify-between">
            <button
              className="btn btn-neutral"
              onClick={() => {
                dispatch(addToCart(product));
                handleAddToCart();
              }}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
