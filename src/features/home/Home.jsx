import React from "react";
import Slider from "./components/Slider";
import ProductsList from "../products/components/ProductsList";
import Categories from "../categories/components/Categories";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../products/Products-Slice";
function Home() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <Slider />
      <Categories />
      <h1 className="my-8 px-[24px]  text-3xl font-bold underline underline-offset-4">NEW ARRIVALS</h1>
      <ProductsList products={products} productsPerPage ={12} />
    </>
  );
}

export default Home;
