import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
// import order_management_icon from "../../assets/Order_management.png";
function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item" style={{ paddingLeft: "20px" }}>
          <img src={add_product_icon} alt="" />
          <p>Thêm sản phẩm</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item" style={{ paddingLeft: "20px" }}>
          <img src={list_product_icon} alt="" />
          <p>Danh sách sản phẩm</p>
        </div>
      </Link>
      <Link to={"/ordermanagement"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          {/* <img src={order_management_icon} alt="" /> */}
          <p className="sidebar-item-text">
            <span className="icon-management">🧾</span> Quản lý đơn hàng
          </p>
        </div>
      </Link>
      <Link to={"/revenue"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p className="sidebar-item-text">
            <span className="icon-management">📊</span> Thống kê doanh thu
          </p>
        </div>
      </Link>
      <Link to={"/chatbox"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p className="sidebar-item-text">
            <span className="icon-management">💬</span> Trả lời khách hàng
          </p>
        </div>
      </Link>
      <Link to={"/accountmanagement"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <p className="sidebar-item-text">
            <span className="icon-management">🧑‍💼 </span> Quản lý tài khoản
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
