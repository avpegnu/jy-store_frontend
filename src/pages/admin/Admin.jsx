import AddProduct from "../../components/AddProductComponent/AddProduct";
import LisProduct from "../../components/ListProductComponent/ListProduct";
import Sidebar from "../../components/SidebarComponent/Sidebar";
import "./Admin.css";
import { Routes, Route } from "react-router-dom";
function Admin() {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<LisProduct />} />
        <Route path="/updateproduct/:id" element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default Admin;
