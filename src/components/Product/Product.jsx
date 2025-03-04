import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../rtk/slices/Cart-Slice";

function Product(props) {

  const dispatch = useDispatch()

  const { product } = props;
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={product.images?.[0] || product.images?.[1] || product.images?.[2]}
          className="card-img-top"
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description}</p>
            <Link to={`/product/${product.id}`} className="btn btn-primary">
              Details
            </Link>
            <button onClick={()=>dispatch(addToCart(product))} className="btn btn-primary">
              AddToCart
            </button>
        </div>
      </div>
    </>
  );
}

export default Product;
