import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import {Row, Col, ListGroup, Image, Card, Button, Form} from "react-bootstrap"
import Rating from "../components/Rating"
import axios from "axios"
import { useGetProductsByIdQuery } from '../slices/productApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {addToCart} from "../slices/cartSlice.js"
import { useDispatch } from 'react-redux'

const ProductPage = () => {
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch()
  const {data:product, isLoading, error} = useGetProductsByIdQuery(id)

  const addToCartHandler = () =>{
   dispatch(addToCart({...product, qty}))
   navigate("/cart")
  }
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>{product.name}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value-={product.rating} text={product.numReviews} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>${product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form as="select" 
                          onChange={(e)=>setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => <option key={x+1}>{x+1}</option>)
}
                          </Form>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      variant="dark"
                      disabled={product.countInStock == 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductPage
