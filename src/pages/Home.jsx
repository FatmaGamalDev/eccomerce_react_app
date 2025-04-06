import React from "react";
import Slider from "../features/home/components/Slider";
import ProductsList from "../features/products/components/ProductsList";
import Categories from "../features/categories/components/Categories";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/Products-Slice";
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
