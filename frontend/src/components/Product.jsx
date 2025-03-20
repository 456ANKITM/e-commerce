import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating"
import {Link} from "react-router"

const Product = ({ product }) => {
  return (
    <Card className="shadow-sm rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img variant="top" src={product.image}/>
      </Link>
      <Card.Body>
        <Card.Title as="div" className="product-title">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </Card.Title>
        <Rating value={product.rating} text={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
