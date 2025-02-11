import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

function ProductsList() {
    const API_URL = process.env.REACT_APP_API_URL;
    // const API_URL = "https://dummyjson.com/products";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // function to fetch products array from api and put it in a state
  function getProducts() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("error fetching data:", error));
  }
  // function to fetch category list from api and put it in a state
  function getCategories() {
    fetch(`${API_URL}/category-list`)
      .then((response) => response.json())
      .then((categories) => setCategories(categories))
      .catch((error) => console.error("error fetching data:", error));
  }
  // function to fetch products by category from api and put it in a state
  function getProductsByCategory(categoryName) {
    fetch(`${API_URL}/category/${categoryName}`)
      .then((response) => response.json())
      .then((catProducts) => setProducts(catProducts.products))
      .catch((error) => console.error("error fetching data:", error));
    // console.log(Products);
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <div className=" ProductsList">
      <h1 className="text-center p-3">ProductsList</h1>
      <button
        onClick={() => {
          getProducts();
        }}
        class="btn btn-success m-1"
      >
        All
      </button>
      {/*desplay the categories we get from the categories state in buttons*/}
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
        {products.slice(0,16).map((product) => {
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
