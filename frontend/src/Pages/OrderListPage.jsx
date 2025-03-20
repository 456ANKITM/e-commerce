import React from "react";
import { useGetOrdersQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import {useNavigate} from "react-router"

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const navigate = useNavigate();
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
          <h1>Orders</h1>
          <Table striped hover responsive bordered>
            <thead>
              <th>ID</th>
              <th>USER</th>
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
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isDelivered ? (
                      order.isDeliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes />
                    )}
                  </td>
                  <td>
                    {order.isDePaid ? (
                      order.isPaiddAt.substring(0, 10)
                    ) : (
                      <FaTimes />
                    )}
                  </td>
                  <td>
                    <Button variant="light" size="sm" onClick={()=>navigate(`/order/${order._id}`)}>
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default OrderListPage;
