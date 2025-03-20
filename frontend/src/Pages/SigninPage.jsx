import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../slices/usersApiSlice";
import {toast} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector(state=>state.auth)
  const [login, { isLoading }] = useLoginMutation();

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get("redirect") || "/";
  
  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[redirect, navigate, userInfo])
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resp = await login({ email, password }).unwrap();
     dispatch(setCredentials(resp.user))
      toast.success(resp.message)
    } catch (err) {
      toast.error( err?.data?.error || err);
    }
  };

  return (
    <FormContainer>
      <h1>Log in</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Login
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ? <Link to="/signup"> Sign Up</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default SigninPage;
