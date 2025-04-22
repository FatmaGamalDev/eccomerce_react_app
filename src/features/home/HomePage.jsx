import React from "react";
import ProductsList from "../products/components/ProductsList";
import Categories from "../categories/components/Categories";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setActiveCategory } from "../products/Products-Slice";
import Hero from "./components/Hero";
function HomePage() {
  const { products, loading, productsCount } = useSelector(
    (state) => state.products
  );
  const categoryProducts = useSelector(
    (state) => state.products.categoryProducts
  );
  const activeCategory = useSelector((state) => state.products.activeCategory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <React.Fragment>
      <Hero />
      <Categories />
      <div className="flex">
        <button
          onClick={() => dispatch(setActiveCategory(false))}
          className="my-12 pl-[24px]  text-3xl font-bold underline underline-offset-4 "
        >
          ALL <span className="text-2xl px-[5px">/</span>
        </button>
        <h1 className="my-12 text-3xl font-bold underline underline-offset-4 ">
          NEW ARRIVALS
        </h1>
      </div>
      <ProductsList
        products={activeCategory ? categoryProducts : products}
        productsPerPage={12}
        loading={loading}
        productsCount={productsCount}
      />
    </React.Fragment>
  );
}

export default HomePage;
