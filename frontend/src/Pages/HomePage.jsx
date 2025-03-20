import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const HomePage = () => {
  // const {data:products, isLoading, error} = useGetProductsQuery();
  const { data: products, isLoading, error, status } = useGetProductsQuery();
  // console.log("API Response:", { products, error, status });

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("/api/products")
  //     .then((resp) => resp.json())
  //     .then((data) => setProducts(data))
  //     .catch((err) => console.log(err.message));
  // }, []);

  // console.log(products)

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error?.data?.message|| error.error}</Message>
      ) : (
        <Container>
          {" "}
          {/* Wrap inside Bootstrap Container */}
          <h1 className="text-center my-4">Latest Products</h1>
          <Row className="g-4">
            {" "}
            {/* Add gap between rows */}
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomePage;
