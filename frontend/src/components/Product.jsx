import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router";

const Product = ({ product }) => {
  return (
    <Card className="product-card border-0 shadow-sm">
      <Link to={`/products/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image}
          className="product-image"
        />
      </Link>

      <Card.Body>
        <Card.Title as="div" className="product-title">
          <Link to={`/products/${product._id}`} className="product-link">
            {product.name}
          </Link>
        </Card.Title>

        <div className="rating-wrapper">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <Card.Text className="product-price">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;