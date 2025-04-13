import { useRef, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { ShopContext } from "../../context/ShopContext";
import "./Header.css";
import nav_dropdown from "../../assets/nav_dropdown.png";
import { getStorageData, removeStorageData } from "../../helpers/stored";

const Navbar = () => {
  const { getTotalCartItems, resetCart, loadCartFromStorage } =
    useContext(ShopContext);
  const menuRef = useRef();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  useEffect(() => {
    const userData = getStorageData("user", null);
    if (userData && userData.name) {
      setUser(userData);
      loadCartFromStorage();
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    removeStorageData("user");
    // removeStorageData("cartItems");
    // removeStorageData("selectedItems");
    resetCart();
    setUser(null);
    setIsOpen(false);
  };

  return (
    <div className="navbar flex justify-around items-center py-4 shadow-md">
      {/* Logo */}
      <div className="nav-logo flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 text-current no-underline"
        >
          <img src={logo} alt="logo" className="w-[15%]" />
          <p
            className="text-blue-900 text-4xl font-semibold"
            style={{ fontFamily: "Emblema One" }}
          >
            JYSTORE
          </p>
        </Link>
      </div>

      {/* Menu */}
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul
        ref={menuRef}
        className="nav-menu flex items-center gap-12 text-[#283165] text-lg font-semibold z-50"
        style={{ fontFamily: "Roboto" }}
      >
        {[
          { name: "Trang chủ", path: "/" },
          { name: "Nam", path: "/mens" },
          { name: "Nữ", path: "/women" },
          { name: "Trẻ em", path: "/kids" },
        ].map((item) => (
          <li key={item.name} className="nva-top-menu-item">
            <Link to={item.path} className="no-underline text-current">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Login & Cart */}
      <div className="nav-login-cart flex items-center gap-10 relative">
        {!user ? (
          <Link to="/auth/login">
            <button className="cursor-pointer bg-blue-900 text-white px-6 py-3 rounded-full text-base font-semibold transition active:bg-[#330647]">
              Log in
            </button>
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-semibold flex items-center gap-2"
            >
              {user.name} ▼
            </button>
            {isOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/profile">Hồ sơ</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/order">Đơn hàng của tôi</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to="/auth/change-password">Đổi mật khẩu</Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  <Link to="/">Đăng xuất</Link>
                </li>
              </ul>
            )}
          </div>
        )}
        <div
          onClick={() => {
            if (!user) {
              window.location.href = "/auth/login";
            } else {
              window.location.href = "/cart";
            }
          }}
          className="relative cursor-pointer"
        >
          <img src={cart_icon} alt="Cart" className="w-8" />
          <div className="nav-cart-count absolute top-[-10px] right-[-10px] flex justify-center items-center w-6 h-6 rounded-full bg-red-500 text-white text-sm">
            {getTotalCartItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
