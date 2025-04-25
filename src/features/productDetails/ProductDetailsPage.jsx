import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductReviews from "./components/productReviews";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProductDetails } from "./ProaductDetails-Slice";
import QuantitySelector from "../../components/ui/QuantitySelector";
import AddToCartButton from "../../components/ui/AddToCartButton";
import WishlistButton from "../../components/ui/WishlistButton";
import ProductInfo from "./components/ProductInfo";
import ProductImage from "./components/ProductImage";
import { startLoading } from "../loading/loadingSlice";
import RelatedProducts from "../products/components/RelatedProducts";
import Container from "../../components/ui/Container";
import { getProductDetails } from "../products/Products-Slice";

function ProductDetailsPage() {
  const { productID } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const product = useSelector((state) => state.products.selectedProduct);
  
  useEffect(() => {
    if (!product || product.id !== Number(productID)) {
      dispatch(startLoading());
      dispatch(getProductDetails(productID));
    }
  }, [dispatch, productID, product]);

  return (
    <>
      <Container>
        <div className="flex flex-col items-center justify-center gap-8 py-4 md:items-stretch md:flex-row">
          <ProductImage
            imageUrl={product?.images?.[0]}
            discount={product?.discountPercentage}
            title={product?.title}
          />
          {/*display product informations */}
          <div className="flex-col w-[90%] space-y-4 md:w-[50%]">
            <ProductInfo
              title={product?.title}
              brand={product.brand ? product.brand : "brand"}
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
            <p className="text-sm font-semibold text-green-600">
              Only <span>{product.stock}</span> left in stock
            </p>
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
      </Container>
      {/*banner*/}
      <div className="flex items-center justify-center w-full my-8 text-xl uppercase bg-beige h-28">
        reviews & questions
      </div>
      <Container>
        <div className="flex flex-col items-center ">
          <ProductReviews reviews={product?.reviews} />
        </div>
        <div>
          <RelatedProducts category={product.category} />
        </div>
      </Container>
    </>
  );
}

export default ProductDetailsPage;
