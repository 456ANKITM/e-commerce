import React, {useState} from 'react'
import FormContainer from '../components/FormContainer'
import {Form, Button} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'
import { Navigate, useNavigate } from 'react-router'

const ShippingPage = () => {
  const {shippingAddress} = useSelector(state=>state.cart)
  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || "");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitShippingAddress = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
  }
  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1 className="mb-4">Shipping Address</h1>
        <Form onSubmit={submitShippingAddress}>
          <Form.Group controlId="address" className="my-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </Form.Group>
          <Form.Group controlId="City" className="my-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </Form.Group>
          <Form.Group controlId="postalcode" className="my-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Postal Code"
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
            />
          </Form.Group>
          <Form.Group controlId="country" className="my-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </Form.Group>
          <Button className="mt-3" type="submit" variant="dark" onClick={()=>navigate("/payment")}>
            Add Shipping Address
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ShippingPage
