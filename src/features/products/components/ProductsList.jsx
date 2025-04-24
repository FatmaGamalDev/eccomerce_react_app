import React, { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "../../../components/ui/Pagination ";
import Container from "../../../components/ui/Container";
import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductsList({ products, productsPerPage, loading, productsCount, currentPage,
  setCurrentPage }) {
  let totalPages = useMemo(
    () => Math.ceil(products.length / productsPerPage),
    [products, productsPerPage]
  );
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  return (
    <Container size="xl">
      {/* desplay all the products we get them from the api */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {loading
          ? Array.from({ length: productsCount || productsPerPage }).map(
              (_, idx) => <ProductCardSkeleton key={idx} />
            )
          : products.slice(startIndex, endIndex).map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
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

