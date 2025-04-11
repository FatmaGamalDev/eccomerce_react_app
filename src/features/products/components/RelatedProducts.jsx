import React, { useEffect } from "react";
import ProductsList from "./ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../Products-Slice";

function RelatedProducts({ category }) {
  const dispatch = useDispatch(fetchProductsByCategory(category));
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [category, dispatch]);
  return (
    <div>
      <h1 className="my-8 px-[24px]  text-3xl font-bold underline underline-offset-4">
        You may also like
      </h1>
      <ProductsList products={products} productsPerPage={4} />
    </div>
  );
}
export default RelatedProducts;
