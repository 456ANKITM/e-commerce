import {ListGroup, Button, Image, Row, Col, ListGroupItem, Card} from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import { Link, useNavigate } from "react-router"
import { usePlaceOrderMutation } from "../slices/orderApiSlice"
import { toast } from "react-toastify"
import { clearCartItems } from "../slices/cartSlice"


const OrderPage = ()=>{
  const {cartItems,shippingAddress,itemPrice, shippingCharge, totalPrice, paymentMethod} = useSelector(state=>state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [placeOrder,{isLoading, error}] = usePlaceOrderMutation();

  const placeOrderHandler = async() => {
    try{
      let resp = await placeOrder({
        orderItems: cartItems,
        itemPrice,
        shippingCharge,
        totalPrice,
        paymentMethod,
        shippingAddress,
      }).unwrap()
      dispatch(clearCartItems())
      toast.success(resp.message);
      navigate(`/order/${resp.orderId}`)
      
    }catch(err){
      console.log(err)
      toast.error(err)
    }
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address},{shippingAddress.city},
                {shippingAddress.postalCode},{shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
               {cartItems.length==0 ? <Message>Cart is Empty</Message>:(
                cartItems.map(item=>(
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                      <Link to={`/products/${item._id}`}>
                      {item.name}
                      </Link>
                      </Col>
                      <Col md={4}>
                      {item.qty} X {item.price} = ${Number(item.qty) * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
               )}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Item Price</Col>
                <Col>${itemPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping Charge</Col>
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
              <Button type="button" className="btn-block" variant="dark" onClick={placeOrderHandler}>
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderPage;
