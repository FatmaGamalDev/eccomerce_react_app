import React, { useState } from "react";
import ProductCard from "./ProductCard";

import Pagination from "../common/Pagination ";

function ProductsList({ products }) {
  let productsPerPage = 16;
  let totalPages = Math.ceil(products.length / productsPerPage);

  let [currentPage, setCurrentPage] = useState(1);


  // lama el currentpage bytghayar el startIndexwe el endIndex bytghyar
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return (
    <div className="m-8 ">
      {/* <button onClick={() => dispatch(fetchProducts())}>All</button> */}
      {/* desplay all the products we get from the api in the home page*/}
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {products.slice(startIndex, endIndex).map((product) => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
<Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
     
    </div>
  );
}

export default ProductsList;
