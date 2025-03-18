import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";

const Navbar = () => {
  return (
    <div className="flex justify-around items-center py-4 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
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
      <ul
        className="flex items-center gap-12 text-[#283165] text-lg font-semibold"
        style={{ fontFamily: "Sen" }}
      >
        {[
          { name: "Shop", path: "/" },
          { name: "Men", path: "/mens" },
          { name: "Women", path: "/women" },
          { name: "Kid", path: "/kids" },
        ].map((item) => (
          <li key={item.name} className="nva-top-menu-item">
            <Link to={item.path} className="no-underline text-current">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Login & Cart */}
      <div className="flex items-center gap-10">
        <Link to="/auth/login">
          <button className=" cursor-pointer bg-blue-900 text-white px-6 py-3 rounded-full text-base font-semibold transition active:bg-[#330647]">
            Log in
          </button>
        </Link>
        <Link to="/cart" className="relative">
          <img src={cart_icon} alt="Cart" className="w-8" />
          <div className="absolute top-[-10px] right-[-10px] flex justify-center items-center w-6 h-6 rounded-full bg-red-500 text-white text-sm">
            0
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
