import React, { useEffect } from "react";
import Product from "../Product/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "../../rtk/slices/Products-Slice";
function ProductsList() {
  // const API_URL = process.env.REACT_APP_API_URL;
  // const API_URL = "https://dummyjson.com/products";

  // function to fetch products by category from api and put it in a state
  // function getProductsByCategory(categoryName) {
  //   fetch(`${API_URL}/category/${categoryName}`)
  //     .then((response) => response.json())
  //     .then((catProducts) => setProducts(catProducts.products))
  //     .catch((error) => console.error("error fetching data:", error));
  // }

  // useEffect(() => {
  //   getProducts();
  //   getCategories();
  // }, []);

  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.products.categories);

  const dispatch = useDispatch();

  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);
  
  function getProductsByCategory(categoryName) {
    dispatch(fetchProductsByCategory(categoryName));
  }

  return (
    <div className=" ProductsList">
      <h1 className="text-center p-3">ProductsList</h1>

      <button
        onClick={() => dispatch(fetchProducts())}
        className="btn btn-success m-1"
      >
        All
      </button>

      {/* desplay the categories we get from the categories state in buttons */}
      {categories.slice(0, 10).map((cat) => {
        return (
          <button
            onClick={() => {
              getProductsByCategory(cat);
            }}
            class="btn btn-success m-1"
            key={cat}
          >
            {cat}
          </button>
        );
      })}
      <div className="row">
        {/* desplay all the products we get from the api in the home page*/}
        {products.slice(0, 30).map((product) => {
          return (
            <div className="col-3" key={product.id}>
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsList;
