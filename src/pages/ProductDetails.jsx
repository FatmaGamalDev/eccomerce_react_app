import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductReviews from "../components/product/productReviews";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../rtk/slices/ProaductDetails-Slice";
import QuantitySelector from "../components/common/QuantitySelector";
import AddToCartButton from "../components/common/AddToCartButton";
import WishlistButton from "../components/ui/WishlistButton";
import ProductInfo from "../components/product/ProductInfo";
import ProductImage from "../components/product/ProductImage";

function ProductDetails() {
  const { productID } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetails.productDetails);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product || product.id !== Number(productID)) {
      dispatch(fetchProductDetails(productID));
    }
  }, [dispatch, productID, product]);

  useEffect(() => {
    if (product) {
      setProductDetails(product);
      setRating(product.reviews?.[2]?.rating || 0);
    }
  }, [product]);

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-2 p-4 md:items-stretch md:flex-row">
        <ProductImage
          imageUrl={productDetails?.images?.[0]}
          discount={productDetails?.discountPercentage}
          title={productDetails?.title}
        />
        {/*display product informations */}
        <div className="flex-col space-y-4 md:w-[50%]">
          <ProductInfo
            title={productDetails?.title}
            brand={productDetails?.brand}
            description={productDetails?.description}
            rating={productDetails?.reviews?.[2]?.rating}
            price={productDetails?.price}
            discount={productDetails?.discountPercentage}
          />
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            selectedProduct={productDetails}
          />
          <p className="text-sm font-semibold text-green-600">In Stock</p>
          <div className="flex justify-start w-full gap-8 ">
            <AddToCartButton
              selectedProduct={productDetails}
              fromDetails={true}
              quantity={quantity}
              className="w-1/2"
            />
            <WishlistButton />
          </div>
        </div>
      </div>
      {/*banner*/}
      <div className="flex items-center justify-center w-full my-8 text-xl uppercase bg-beige h-28">
        reviews & questions
      </div>
      <ProductReviews />
    </section>
  );
}

export default ProductDetails;
