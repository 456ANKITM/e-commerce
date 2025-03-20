import {Button, Form} from "react-bootstrap";
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useNavigate } from "react-router";

const PaymentPage = ()=>{
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const paymentMethodHandler = (e) =>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
    
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={paymentMethodHandler}>
        <Form.Label as="legend">Payment Method</Form.Label>
        <Form.Check
          type="radio"
          name="payment"
          value="cod"
          label="Cash on Delivery"
          checked={paymentMethod == "cod"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Form.Check
          type="radio"
          name="payment"
          value="esewa"
          label="Esewa"
          checked={paymentMethod == "esewa"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />

        <Button type="submit" variant="dark" className="mt-4">
          Confirm
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentPage;