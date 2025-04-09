import "./ListProduct.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const res = await fetch("http://localhost:8080/allproducts");
      if (!res.ok) {
        throw new Error("Không thể tải sản phẩm.");
      }
      const data = await res.json();
      const activeProducts = data.filter((product) => !product.isDeleted);
      setAllProducts(activeProducts);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      alert("Có lỗi xảy ra khi tải dữ liệu.");
    }
  };

  const editProduct = (product) => {
    navigate(`/updateproduct/${product._id}`, {
      state: { productToUpdate: product },
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      console.log("ID sản phẩm cần xóa:", id);
      const res = await fetch(`http://localhost:8080/removeproduct/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Không thể xóa sản phẩm.");
      }

      setAllProducts(allProducts.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      alert("Có lỗi xảy ra khi xóa sản phẩm.");
    }
  };

  return (
    <div className="list-product">
      <h1>Danh sách tất cả sản phẩm</h1>
      {allProducts.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <div className="list-product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th colSpan={3}>Sản phẩm</th>
                <th colSpan={4}>Tên sản phẩm</th>
                <th colSpan={2}>Giá gốc</th>
                <th colSpan={2}>Giá bán</th>
                <th colSpan={2}>Loại sản phẩm</th>
                <th colSpan={5}>Mô tả</th>
                <th colSpan={2}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product, index) => (
                <tr key={index}>
                  <td colSpan={3}>
                    <img
                      src={product.image}
                      alt="product"
                      className="list-product-icon"
                    />
                  </td>
                  <td colSpan={4}>{product.name}</td>
                  <td colSpan={2}>{product.old_price}đ</td>
                  <td colSpan={2}>{product.new_price}đ</td>
                  <td colSpan={2}>{product.category}</td>
                  <td
                    colSpan={5}
                    style={{ maxWidth: "1000px", wordWrap: "break-word" }}
                  >
                    {product.description}
                  </td>
                  <td colSpan={2}>
                    <div className="list-product-update-container">
                      <div
                        className="list-product-update-icon-container"
                        onClick={() => editProduct(product)}
                      >
                        <FaPencilAlt className="list-product-update-icon" />
                        <span>Sửa</span>
                      </div>
                      <div
                        className="list-product-update-icon-container"
                        onClick={() => removeProduct(product._id)}
                      >
                        <FaTrashAlt className="list-product-update-icon" />
                        <span>Xóa</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
