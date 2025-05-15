import AddProduct from "../../components/AddProductComponent/AddProduct";
import LisProduct from "../../components/ListProductComponent/ListProduct";
import Sidebar from "../../components/SidebarComponent/Sidebar";
import OrderManagement from "../../components/OrderManagementComponent/OrderManagement";
import "./Admin.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Revenue from "../../components/RevenueComponent/Revenue";
import ChatWidget from "../../components/ChatWidgetComponent/ChatWidget";
import AccountManagement from "../../components/AccountManagementComponent/AccountManagement";
function Admin() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const name = queryParams.get("name");
  useEffect(() => {
    if (id && name) {
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", name);
    }
  }, [id, name]);
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<LisProduct />} />
        <Route path="/updateproduct/:id" element={<AddProduct />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/chatbox" element={<ChatWidget />} />
        <Route path="/accountmanagement" element={<AccountManagement />} />
      </Routes>
    </div>
  );
}

export default Admin;
