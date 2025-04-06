import React from "react";
import { useNavigate } from "react-router-dom";
import ProductPrice from "../../productDetails/components/ProductPrice";
import { startLoading, stopLoading } from "../../loading/loadingSlice";
import { useDispatch} from "react-redux";
import { fetchProductDetails } from "../../productDetails/ProaductDetails-Slice";
import CartIconButton from "../../../components/common/CartIconButton";
import WishlistButton from "../../../components/common/WishlistButton";
import { Heart } from "lucide-react";

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
    <div className="relative w-full border border-gray-300 shadow-md card lg:w-[96%] bg-base-100">

      <figure className=" w-[80%] h-[80%] bg-white aspect-square self-center">
        <div onClick={handleClick} className="cursor-pointer">

          <div className="absolute left-0 w-16 px-2 py-1 text-lg text-white border-none rounded-none bg-pink badge top-3">
            <h6>{`- ${Math.ceil(product.discountPercentage)}% `}</h6>
          </div>
          <img
            className="object-cover w-full h-full rounded-t-lg"
            src={product.images?.[0] || "/assets/ImagePlaceholder.jpg"}
            alt={product.title}
          />
        </div>

      </figure>

      <hr className="w-[90%] self-center"></hr>
      
      <div className="p-[12px] card-body">
        <h2 className="text-gray-800 card-title h-[48px]">
          {product.title}
        </h2>
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
