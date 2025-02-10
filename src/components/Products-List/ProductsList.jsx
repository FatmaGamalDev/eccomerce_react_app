import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

function ProductsList() {
//   const API_URL = process.env.REACT_APP_API_URL
  const API_URL ="https://dummyjson.com/products"

  const [products, setProducts] = useState([]);

  useEffect(() => {
    //fetch products array from api and put it in a state
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error)=>console.error("error fetching data:",error))
  }, []);

  return (
    <div className=" ProductsList">
      <h1 className="text-center p-3">ProductsList</h1>
      <div className="row">
        {products.map((product) => {
          return (
            <div className="col-3" key={product.id}>
              <Product product={product}  />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsList;
