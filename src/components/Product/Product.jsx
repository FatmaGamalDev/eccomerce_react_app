import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  console.log(props);
  const { product } = props;
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={product.images}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
            <Link to={`/product/${product.id}`} className="btn btn-primary">
              Details
            </Link>
        </div>
      </div>
    </>
  );
}

export default Product;
