import React from "react";

function Product(props) {
    console.log(props)
    const {product}=props;
  return (
    <>
      <div className="card" style={{width: "18rem"}}>
        <img src={product.images} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">
            {/* Some quick example text to build on the card title and make up the
            bulk of the card's content. */}
            {product.description}
          </p>
          <a href="#" className="btn btn-primary">
            add to cart
          </a>
        </div>
      </div>
    </>
  );
}

export default Product;
