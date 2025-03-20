import React from "react";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/react.svg";
import {useDispatch, useSelector} from "react-redux"
import {NavLink, useNavigate} from "react-router";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { removeCredentials } from "../slices/authSlice";


const Header = () => {
  const {cartItems} = useSelector(state=>state.cart)
  const {userInfo} = useSelector(state=>state.auth)
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async()=>{
    try{
     let resp = await logout().unwrap()
     dispatch(removeCredentials())
     navigate("/signin")
     toast.success(resp.message)
    }catch(err){
      toast.error(err?.data?.message || err.error)
    }
  }


  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <NavLink className="navbar-brand" to="/">
            <img src={logo} />
            Broadway
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink className="nav-link" to="/cart">
                <FaShoppingCart /> Cart
                {cartItems.length != 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                  </Badge>
                )}
              </NavLink>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink className="nav-link" to="/signin">
                  <FaUser /> Sign in
                </NavLink>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin">
                  <NavDropdown.Item onClick={() => navigate("/admin/products")}>
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/admin/orders")}>
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
