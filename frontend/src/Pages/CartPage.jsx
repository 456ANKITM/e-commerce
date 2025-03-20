import React from 'react'
import {Row, Col, Image, ListGroup, Button, Form, Card} from "react-bootstrap"
import Message from "../components/Message"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { FaTrash } from 'react-icons/fa';
import {addToCart, removeItem} from "../slices/cartSlice"


const CartPage = () => {
 const {cartItems, itemPrice, shippingCharge, totalPrice} = useSelector((state)=>state.cart)
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const updateCartQty = (product, qty) => {
  dispatch(addToCart({...product, qty}))
 }

 const removeItemHandler= (id) =>{
  dispatch(removeItem(id))
 }
  return (
    <>
      <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Cart is Empty. <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${(item.price * item.qty).toFixed(2)}</Col>
                    <Col md={2}>
                      {" "}
                      <Form
                        as="select"
                        onChange={(e) => {
                          updateCartQty(item, e.target.value);
                        }}
                        value={item.qty}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form>
                    </Col>
                    <Col md={2}>
                      <Button variant="light" onClick={()=> removeItemHandler(item._id)}>
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal(
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                    ) items
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping Charge:</Col>
                    <Col>${shippingCharge}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                 <Button type="button" variant="dark" onClick={()=>
                  navigate("/signin?redirect=/shipping")}>

                  Proceed to Checkout
                 </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default CartPage

