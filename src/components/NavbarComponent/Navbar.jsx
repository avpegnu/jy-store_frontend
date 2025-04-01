import "./Navbar.css";
import logo from "../../assets/logo.png";
import navProfile from "../../assets/nav-profile.svg";
function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="navbar-logo" />
        <div className="navbar-title">
          <h1>JYSTORE</h1>
          <p>Admin</p>
        </div>
      </div>
      <img src={navProfile} alt="nav profile" className="navbar-profile" />
    </div>
  );
}

export default Navbar;
