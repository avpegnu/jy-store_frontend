import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "../components/Auth/Signup.jsx";
import Login from "../components/Auth/Login.jsx";
import Header from "../components/HeaderComponent/Header.jsx";
import Home from "../pages/Home.jsx";
import Cart from "../pages/Cart.jsx";
import Product from "../pages/Product.jsx";
import ShopCategory from "../pages/ShopCategory.jsx";

const AppRouter = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/mens" element={<ShopCategory category="men" />} />
      <Route path="/women" element={<ShopCategory category="women" />} />
      <Route path="/kids" element={<ShopCategory category="kid" />} />
      <Route path="/product" element={<Product />}>
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
);

export default AppRouter;
