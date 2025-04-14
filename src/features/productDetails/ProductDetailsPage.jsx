import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductReviews from "./components/productReviews";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "./ProaductDetails-Slice";
import QuantitySelector from "../../components/common/QuantitySelector";
import AddToCartButton from "../../components/common/AddToCartButton";
import WishlistButton from "../../components/common/WishlistButton";
import ProductInfo from "./components/ProductInfo";
import ProductImage from "./components/ProductImage";
import { startLoading, stopLoading } from "../loading/loadingSlice";
import RelatedProducts from "../products/components/RelatedProducts";

function ProductDetailsPage() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const {product} = useSelector((state) => state.productDetails);

  useEffect(() => {
    if (!product || product.id !== Number(productID)) {
      dispatch(startLoading()); 
      dispatch(fetchProductDetails(productID)).finally(() => {
        dispatch(stopLoading()); 
      });
    }
  }, [dispatch, productID, product]);

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-2 p-4 md:items-stretch md:flex-row">
        <ProductImage
          imageUrl={product?.images?.[0]}
          discount={product?.discountPercentage}
          title={product?.title}
        />
        {/*display product informations */}
        <div className="flex-col w-[90%] space-y-4 md:w-[50%]">
          <ProductInfo
            title={product?.title}
            brand={product?.brand}
            description={product?.description}
            rating={product?.reviews?.[2]?.rating}
            price={product?.price}
            discount={product?.discountPercentage}
          />
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            selectedProduct={product}
          />
          <p className="text-sm font-semibold text-green-600">Only <span>{product.stock}</span> left in stock</p>
          <div className="flex justify-start w-full gap-8 ">
            <AddToCartButton
              selectedProduct={product}
              fromDetails={true}
              quantity={quantity}
              className="w-1/2"
            />
            <WishlistButton product={product} className="btn" />
          </div>
        </div>
      </div>
      {/*banner*/}
      <div className="flex items-center justify-center w-full my-8 text-xl uppercase bg-beige h-28">
        reviews & questions
      </div>
      <div className="flex flex-col items-center ">
      <ProductReviews reviews={product?.reviews} />
      </div>
      <div>
        <RelatedProducts category={product.category}/>
      </div>
    </section>
  );
}

export default ProductDetailsPage;

