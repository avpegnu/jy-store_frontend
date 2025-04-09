import { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { getStorageData } from "../../helpers/stored";

const ProductDisplay = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return <div className="product-display">Đang tải sản phẩm...</div>;
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    const user = getStorageData("user", null);

    if (!user) {
      // Nếu chưa đăng nhập → lưu lại hành động + chuyển hướng
      sessionStorage.setItem(
        "pendingAddToCart",
        JSON.stringify({ itemId: product._id, size: selectedSize })
      );
      navigate("/auth/login");
      return;
    }

    // Nếu đã đăng nhập → thêm vào giỏ
    addToCart(product._id, selectedSize);
  };

  return (
    <div className="product-display">
      <div className="product-display-left w-1/2">
        <div className="product-display-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="product-display-img">
          <img
            className="product-display-main-img"
            src={product.image}
            alt=""
          />
        </div>
      </div>
      <div
        className="product-display-right w-1/2"
        style={{ fontFamily: "Roboto" }}
      >
        <h1>{product.name}</h1>
        <div className="product-display-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="product-display-right-prices">
          <div className="product-display-right-price-old">
            {product.old_price}đ
          </div>
          <div className="product-display-right-price-new">
            {product.new_price}đ
          </div>
        </div>
        <div className="product-display-right-description">
          {product.description}
        </div>
        <div className="product-display-right-size">
          <h1>Chọn kích thước</h1>
          <div className="product-display-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "active-size" : ""}
                onClick={() => handleSizeClick(size)}
                style={{
                  border:
                    selectedSize === size ? "2px solid #555" : "1px solid #ccc",
                  cursor: "pointer",
                }}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <button
          disabled={!selectedSize}
          onClick={handleAddToCart}
          style={{
            backgroundColor: selectedSize ? "red" : "#ccc",
            cursor: selectedSize ? "pointer" : "not-allowed",
          }}
        >
          THÊM VÀO GIỎ HÀNG
        </button>
        <p className="product-right-category">
          <span>Loại: </span> Nam, Áo khoác
        </p>
        <p className="product-right-category">
          <span>Nhãn: </span> Hiện đại, Mới
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
