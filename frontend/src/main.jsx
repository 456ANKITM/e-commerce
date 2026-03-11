import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import SigninPage from "./Pages/SigninPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
import ShippingPage from "./Pages/ShippingPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import OrderPage from "./Pages/OrderPage.jsx";
import OrderDetailsPage from "./Pages/OrderDetailsPage.jsx";
import Profilepage from "./Pages/Profilepage.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListPage from "./Pages/OrderListPage.jsx";
import ProductListPage from "./Pages/ProductListPage.jsx";
import ProductEditPage from "./Pages/ProductEditPage.jsx";
import Signup from "./Pages/Signup.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path='signup' element={<Signup />} /> 

          <Route Path="" element={<PrivateRoute />}>
            <Route path="shipping" element={<ShippingPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="placeorder" element={<OrderPage />} />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="profile" element={<Profilepage />} />
          </Route>

          <Route path="" element={<AdminRoute />}>
            <Route path="admin/orders" element={<OrderListPage />} />
            <Route path="admin/products" element={<ProductListPage />} />
            <Route
              path="admin/product/:id/edit"
              element={<ProductEditPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
