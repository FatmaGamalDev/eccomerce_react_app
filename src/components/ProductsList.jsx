import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
} from "../rtk/slices/Products-Slice";
function ProductsList() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="m-8 ">
      {/* <button onClick={() => dispatch(fetchProducts())}>All</button> */}
      {/* desplay all the products we get from the api in the home page*/}
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {products.slice(0, 16).map((product) => {
          return (
            <div key={product.id}>
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsList;
