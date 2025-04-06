import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "../../../components/common/Pagination ";
import Container from "../../../components/common/Container";

function ProductsList({ products }) {
  let productsPerPage = 12;
  let totalPages = Math.ceil(products.length / productsPerPage);
  let [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return (
    <Container size="xl">
      {/* <button onClick={() => dispatch(fetchProducts())}>All</button> */}
      {/* desplay all the products we get from the api in the home page*/}
      <h1 className="my-12 text-3xl font-bold underline underline-offset-4">NEW ARRIVALS</h1>
      <div className="grid grid-cols-1 gap-x-2 gap-y-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {products.slice(startIndex, endIndex).map((product) => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Container>
  );
}

export default ProductsList;
