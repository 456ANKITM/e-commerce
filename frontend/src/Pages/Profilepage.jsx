import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import {Link} from "react-router"

const Profilepage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo.name || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [
    updateProfile,
    { isLoading: profileUpdateLoading, error: profileUpdateErr },
  ] = useUpdateProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const dispatch = useDispatch();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      if (password != confirmpassword) {
        toast.error("Password does not Match");
      } else {
        let res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res.user));
        toast.success(res.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Row>
        <Col md={5}>
          <h2>Profile</h2>
          <FormContainer>
            <Form onSubmit={handleUpdateProfile}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email" className="my-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmpassword" className="my-3">
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" disabled={profileUpdateLoading}>
                Update
              </Button>
            </Form>
          </FormContainer>
        </Col>
        <Col md={7}>
          <h2>Your Orders</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table striped hover responsive variant="sm">
              <thead>
                <th>ID</th>
                <th>DATE</th>
                <th>PRICE</th>
                <th>DELIVERED</th>
                <th>PAID</th>
                <th></th>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{color:"red"}} />
                      )}
                    </td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{color:"red"}} />
                      )}
                    </td>
                    <td>
                      <Button as={Link} to={`/order/${order._id}`} variant="light" size="sm">
                          Details
                      </Button> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Profilepage;
