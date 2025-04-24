import React, { useState, useEffect, useMemo } from "react";
import ProductsList from "../products/components/ProductsList";
import Categories from "../categories/components/Categories";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setActiveCategory } from "../products/Products-Slice";
import Hero from "./components/Hero";

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  // Selectors
  const activeCategory = useSelector((state) => state.products.activeCategory);
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  // function for filtration
  const filteredProducts = useMemo(()=>{
    if(!activeCategory ) return products
    return  products.filter((product) => product.category === activeCategory)
  }, [products, activeCategory]) 
  
  // Fetch products only once on mount
  useEffect(() => {
    if (!products.length && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products, loading]);


  return (
    <React.Fragment>
      <Hero />
      <Categories setCurrentPage={setCurrentPage} />
      <div className="flex">
        <button
          onClick={() => {
            dispatch(setActiveCategory(false));
            setCurrentPage(1);
          }}
          className="my-12 pl-[24px] text-3xl font-bold underline underline-offset-4"
        >
          ALL <span className="text-2xl px-[5px]">/</span>
        </button>
        <h1 className="my-12 text-3xl font-bold underline underline-offset-4">
          NEW ARRIVALS
        </h1>
      </div>
      <ProductsList
        products={filteredProducts}
        productsPerPage={12}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </React.Fragment>
  );
}

export default HomePage;
