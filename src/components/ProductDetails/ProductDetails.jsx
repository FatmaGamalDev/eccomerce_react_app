import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { productID } = useParams();
  const [productDetails, setProductDetails] = useState({});
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productID}`)
      .then((response) => response.json())
      .then((product) => setProductDetails(product));
  }, []);
  return (
    <>
      <div>{`ProductDetails ${productDetails.title}`}</div>
    </>
  );
}

export default ProductDetails;
