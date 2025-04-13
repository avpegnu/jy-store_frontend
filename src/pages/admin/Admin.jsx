import AddProduct from "../../components/AddProductComponent/AddProduct";
import LisProduct from "../../components/ListProductComponent/ListProduct";
import Sidebar from "../../components/SidebarComponent/Sidebar";
import OrderManagement from "../../components/OrderManagementComponent/OrderManagement";
import "./Admin.css";
import { Routes, Route } from "react-router-dom";
import Revenue from "../../components/RevenueComponent/Revenue";
function Admin() {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<LisProduct />} />
        <Route path="/updateproduct/:id" element={<AddProduct />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/revenue" element={<Revenue />} />
      </Routes>
    </div>
  );
}

export default Admin;
