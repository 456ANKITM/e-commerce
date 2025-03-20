import React from "react";
import {
  useDeliverOrderMutation,
  useGetEsewaFormDataQuery,
  useGetOrderByIdQuery,
} from "../slices/orderApiSlice";
import { Link, useParams } from "react-router";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { shippingAddress } = useSelector((state) => state.cart);
  const { data: order, isLoading, error, refetch } = useGetOrderByIdQuery(id);
  const { data: formData, error: esewaFormDataErr } =
    useGetEsewaFormDataQuery(id);
  const { userInfo } = useSelector((state) => state.auth);

  const [deliverOrder, { isLoading: deliverLoading }] =
    useDeliverOrderMutation();

  const handleEsewaPayment = async () => {
    if (esewaFormDataErr || !formData) {
      toast.error(
        esewaFormDataErr?.data?.message || "Failed to get esewa data"
      );
    }
    let path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (let key in formData) {
      let hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    console.log(form);
    form.submit();
  };

  const handleOrderDelivery = async () => {
    if (order.paymentMethod == "esewa" && !order.isPaid) {
      toast.error("Order Not Paid Yet!");
    } else {
      try {
        let res = await deliverOrder(order._id);
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p style={{ lineHeight: "2px" }}>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address:</strong> {shippingAddress.address}, {""}
                {shippingAddress.city},{shippingAddress.postalCode} {""},
                {shippingAddress.country}
              </p>
              <Message variant={order.isDelivered ? "sucsess" : "danger"}>
                {order.isDelivered
                  ? "Delivered at" + order.deliveredAt
                  : "Order not Delivered"}
              </Message>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method</h3>
              <strong>
                {order.paymentMethod == "cod"
                  ? "Cash on Delivery"
                  : "Payment through esewa"}
              </strong>
              <Message variant={order.isPaid ? "sucsess" : "danger"}>
                {order.isPaid ? "Paid on" + order.paidAt : "Not Paid"}
              </Message>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup>
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X {item.price} = $
                        {Number(item.qty) * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
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
                  <Col>Item</Col>
                  <Col>${order.itemPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingCharge}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {order.paymentMethod === "esewa" &&
                !order.isPaid &&
                !userInfo.isAdmin && (
                  <ListGroup.Item>
                    <Button
                      variant="success"
                      className="btn-block"
                      onClick={handleEsewaPayment}
                    >
                      Pay With Esewa{" "}
                    </Button>
                  </ListGroup.Item>
                )}
              {userInfo.isAdmin && !order.isDelivered && (
                <ListGroup.Item>
                  <Button variant="dark" onClick={handleOrderDelivery}>
                    {" "}
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderDetailsPage;
