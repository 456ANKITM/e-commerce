import React from "react";
import {
  useCreateProductMutation,
  useDelteProductMutation,
  useGetProductsQuery,
} from "../slices/productApiSlice";
import { Row, Col, Button, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";

const ProductListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDelteProductMutation();
  const addProductHandler = async () => {
    try {
      await createProduct().unwrap();
      toast.success("Product Created!");
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };
  const deleteProductHandler = async (id) => {
    try {
      if (window.confirm("Are You Sure you want to delete this product ?")) {
        const res = await deleteProduct(id).unwrap();
        toast.success("Prodcut deleted");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.error || err.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <>
          <Row className="align-items-center mb-4">
            <Col>
              <h1>Products</h1>
            </Col>
            <Col className="text-end">
              <Button variant="dark" size="sm" onClick={addProductHandler}>
                <FaEdit />
                Create Products
              </Button>
            </Col>
          </Row>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/product/${product._id}/edit`}
                      variant="light"
                      size="sm"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="ms-2"
                      variant="danger"
                      size="sm"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <FaTrash />
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

export default ProductListPage;
