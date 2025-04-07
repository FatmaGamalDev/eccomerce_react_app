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
      <ProductsList products={products} />
    </>
  );
}

export default Home;
