import { useSelector } from "react-redux"
import {Navigate, Outlet} from "react-router"

const PrivateRoute = () => {
  const {userInfo} = useSelector((state)=>state.auth)

  return userInfo ? <Outlet/> : <Navigate to="/signin" />
}

export default PrivateRoute;