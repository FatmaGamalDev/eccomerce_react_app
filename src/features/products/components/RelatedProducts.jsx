import React, { useEffect, useMemo, useState } from "react";
import ProductsList from "./ProductsList";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../Products-Slice";

function RelatedProducts({ category }) {
  const { products } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveCategory(category));
  }, [category, dispatch]);
  
  // function for filtration
  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.category === category);
  }, [products]);

  return (
    <div>
      <h1 className="my-8 px-[24px]  text-3xl font-bold underline underline-offset-4">
        You may also like
      </h1>
      <ProductsList
        products={filteredProducts}
        productsPerPage={4}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
export default RelatedProducts;
