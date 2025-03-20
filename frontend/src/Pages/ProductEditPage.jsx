import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import {
  useEditProductMutation,
  useGetProductsByIdQuery,
  useUploadProductImageMutation,
} from "../slices/productApiSlice";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const ProductEditPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: product } = useGetProductsByIdQuery(id);
  console.log(product);
  const [editProduct, { isLoading: editLoading }] = useEditProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product]);

  const editProductHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await editProduct({
        name,
        price,
        category,
        brand,
        description,
        productId: product._id,
        image,
      }).unwrap();
      navigate("/admin/products");
      toast.success("Product Edited Sucessfully");
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };
  const uploadFileHandler = async (e) => {
    try {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      let res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.path);
    } catch (error) {
      toast.error(error?.data?.error || error.error);
    }
  };
  return (
    <>
      <FormContainer>
        <h2>Edit Product</h2>
        <Form onSubmit={editProductHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image" className="my-2">
            <Form.Label>Chose Image</Form.Label>
            <Form.Control
              type="file"
              label="Chose Image"
              onChange={uploadFileHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="category" className="my-2">
            <Form.Label>category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="dark">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
