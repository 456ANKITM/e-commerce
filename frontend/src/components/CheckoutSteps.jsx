import {Nav} from "react-bootstrap"
import { NavLink } from "react-router"

const CheckoutSteps = ({step1, step2, step3, step4}) =>{
  return(
    <Nav className="justify-contet-center mb-4">
      <Nav.Item>
        {
          step1?(
            <NavLink className='nav-link' to='/signin'>
              signin
            </NavLink>
          ) : <Nav.Link disabled>signin</Nav.Link>
        }
      </Nav.Item>
      <Nav.Item>
        {
          step2?(
            <NavLink className='nav-link' to='/shipping'>
              shipping
            </NavLink>
          ) : <Nav.Link disabled>shipping</Nav.Link>
        }
      </Nav.Item>
      <Nav.Item>
        {
          step3?(
            <NavLink className='nav-link' to='/payment'>
              payment
            </NavLink>
          ) : <Nav.Link disabled>payment</Nav.Link>
        }
      </Nav.Item>
      <Nav.Item>
        {
          step4?(
            <NavLink className='nav-link' to='/placeorder'>
              Order
            </NavLink>
          ) : <Nav.Link disabled>Order</Nav.Link>
        }
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps;