import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductReviews from "../components/product/productReviews";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../rtk/slices/ProaductDetails-Slice";
import QuantitySelector from "../components/product/QuantitySelector";
import AddToCartButton from "../components/product/AddToCartButton";
import ProductRating from "../components/product/ProductRating";
import ProductPrice from "../components/product/ProductPrice";
import WishlistButton from "../components/product/WishlistButton";

function ProductDetails() {
  const { productID } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productDetails.productDetails);

  // get the selected product from the cart state we stored in redux and its quantity
  // const cartItem = useSelector((state) =>
  //   state.cart.find((item) => item.id === product.id)
  // );
  // const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
  const [quantity, setQuantity] = useState( 1);


//  update quantity in cart
  // useEffect(() => {
  //   if (cartItem) {
  //     setQuantity(cartItem.quantity); 
  //   }
  // }, [cartItem]);

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
    <>
      <div className="flex flex-col gap-2 p-4 md:flex-row">
        <div className="relative mx-1 mt-4">
          <div className="absolute top-0 left-0 w-12 text-white badge bg-pink">
            NEW
          </div>
        </div>
        <div className="w-[80%]">
          <img
            className="w-84 md:w-1/2 md:h-84"
            src={
              productDetails.images?.[0] ||
              productDetails.images?.[1] ||
              productDetails.images?.[3]
            }
            alt={productDetails.title}
          />
        </div>
        {/*display product informations */}
        <div className="flex-col space-y-4 md:mt-10 ">
          <div className="text-2xl font-semibold capitalize">
            {productDetails.title}
          </div>
          <span className="badge badge-soft badge-neutral">
            {productDetails.brand}
          </span>
          <div className="capitalize text-md ">
            <p>Discription:</p>
            {productDetails.description}
          </div>
          <ProductRating rating={rating} />
          <ProductPrice
            price={productDetails.price}
            discountPercentage={productDetails.discountPercentage}
          />
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            selectedProduct={productDetails}
          />
          <p className="text-sm font-semibold text-green-600">In Stock</p>
          <div className="flex align-center">
            <AddToCartButton
              selectedProduct={productDetails}
              fromDetails={true}
              quantity={quantity}
              className="w-64"
            />
            
            <WishlistButton />
            <hr />
          </div>
        </div>
      </div>
      {/* -------------------------banner1------------------- */}
      <div className="flex items-center justify-center w-full my-8 text-xl uppercase bg-beige h-28">
        reviews & questions
      </div>
      <ProductReviews />
      {/* -------------------------banner2------------------- */}
      <div className="flex flex-col items-center justify-center w-full py-12 my-8 space-y-2 bg-nude h-28">
        <h1 className="font-bold">#HUDABEAUTIES</h1>
        <p className="text-center">
          Show us your looks and tag @hudabeauty #hudabeauties for a chance to
          be featured!
        </p>
      </div>
    </>
  );
}

export default ProductDetails;
