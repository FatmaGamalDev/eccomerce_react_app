import React from "react";
import { useNavigate } from "react-router-dom";
import ProductPrice from "../../productDetails/components/ProductPrice";
import { startLoading, stopLoading } from "../../loading/loadingSlice";
import { useDispatch } from "react-redux";
import { fetchProductDetails } from "../../productDetails/ProaductDetails-Slice";
import WishlistButton from "../../../components/ui/WishlistButton";
import ProductImagePlaceholder from "../../../Assets/ImagePlaceholder.jpg";
import CartIconButton from "../../../components/ui/CartIconButton";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleClick() {
    dispatch(startLoading());
    await dispatch(fetchProductDetails(product.id));
    dispatch(stopLoading());
    navigate(`/product/${product.id}`);
  }
  return (
    <div
      onClick={handleClick}
      className="ease-in-out hover:scale-[1.02] hover:shadow-xl  duration-300 transform transition-all cursor-pointer relative w-full border border-gray-300 shadow-md card lg:w-[96%] bg-base-100"
    >
      <figure className="self-center w-full h-full  aspect-square">
        <div className="flex items-center justify-center ">
          <div className="absolute left-0 flex items-center justify-between w-full pr-[4px] top-[10px]">
            <div className="z-10 w-16 px-2 py-1 text-white border-none rounded-none text-md bg-pink badge top-3">
              <h6>{`- ${Math.ceil(product.discountPercentage)}%`}</h6>
            </div>
            {/* WishlistButton */}
            <WishlistButton
              product={product}
              className="absolute bg-transparent border-none right-[5px] text-lg -top-2 z-10000  "
            />
          </div>
          <img
            className="object-cover  w-[80%] h-[80%] rounded-t-lg "
  
            src={
              product?product.thumbnail : ProductImagePlaceholder
            }
            alt={product.title}
            loading="lazy"
          />
        </div>
      </figure>
      <hr className="w-[90%] self-center" />
      <div className="p-[12px] card-body">
        <h2 className="text-gray-800 text-sm md:text-lg card-title h-[48px]">{product.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between">
          <ProductPrice
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
          <CartIconButton quantity={1} selectedProduct={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
