import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Signup from "../components/Auth/Signup.jsx";
import Login from "../components/Auth/Login.jsx";
import Header from "../components/HeaderComponent/Header.jsx";
import Home from "../pages/Home.jsx";
import Cart from "../pages/Cart.jsx";
import Product from "../pages/Product.jsx";
import ShopCategory from "../pages/ShopCategory.jsx";
import Footer from "../components/FooterComponent/Footer.jsx";
import men_banner from "../assets/banner_mens.png";
import women_banner from "../assets/banner_women.png";
import kid_banner from "../assets/banner_kids.png";
import ChangePassword from "../components/Auth/Password.jsx";
import Checkout from "../components/CheckoutComponent/Checkout.jsx";

// Component để kiểm tra đường dẫn
const Layout = ({ children }) => {
  const location = useLocation();
  const authPaths = ["/auth/login", "/auth/signup"];

  return (
    <>
      {!authPaths.includes(location.pathname) && <Header />}
      {children}
      {!authPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

const AppRouter = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/change-password" element={<ChangePassword />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />
        <Route
          path="/women"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="kid" />}
        />
        <Route path="/product">
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  </Router>
);

export default AppRouter;
