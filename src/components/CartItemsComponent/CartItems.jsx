import { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

const CartItems = () => {
  const {
    allProduct,
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    selectedItems,
    getSelectedTotalAmount,
    toggleSelectItem,
  } = useContext(ShopContext);

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + "đ";
  };

  const parsePrice = (str) => parseInt(str.replace(/\./g, ""), 10);

  return (
    <div className="cart-items">
      <div className="cart-items-format-main">
        <p>Sản phẩm</p>
        <p>Tên sản phẩm</p>
        <p>Giá</p>
        <p>Size</p>
        <p>Số lượng</p>
        <p>Tổng</p>
        <p style={{ textAlign: "center" }}>Thao tác</p>
      </div>
      <hr />
      {Object.entries(cartItems).map(([key, quantity]) => {
        if (quantity <= 0) return null;

        const [productId, size] = key.split("_");
        const product = allProduct.find((p) => p._id === productId);
        if (!product) return null;

        return (
          <div key={key}>
            <div className="cart-items-format cart-items-format-main">
              <img
                className="cart-items-product-icon"
                src={product.image}
                alt=""
              />

              <p>{product.name}</p>
              <p>{product.new_price}đ</p>
              <p>Size: {size}</p>
              <div className="cart-items-quantity-control">
                <button onClick={() => decreaseCartQuantity(product._id, size)}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => increaseCartQuantity(product._id, size)}>
                  +
                </button>
              </div>

              <p>{formatCurrency(parsePrice(product.new_price) * quantity)}</p>

              <div className="cart-items-remove-icon">
                <input
                style={{ width: "20px", height: "20px" }}
                  type="checkbox"
                  checked={selectedItems.includes(key)}
                  onChange={() => toggleSelectItem(key)}
                />

                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(product._id, size)}
                  alt="Xóa"
                />
              </div>
            </div>
            <hr />
          </div>
        );
      })}

      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>Thanh toán</h1>
          <div>
            <div className="cart-items-total-item">
              <p>Tổng số tiền</p>
              <p>{formatCurrency(getSelectedTotalAmount())}</p>
            </div>
            <hr />
            <div className="cart-items-total-item">
              <p>Phí vận chuyển</p>
              <p>Miễn phí</p>
            </div>
            <hr />
            <div className="cart-items-total-item">
              <h3>Tổng thanh toán</h3>
              <h3>{formatCurrency(getSelectedTotalAmount())}</h3>
            </div>
          </div>
          <Link to="/checkout">
            <button>Đặt hàng</button>
          </Link>
        </div>
        <div className="cart-items-promo-code">
          <p>Nếu bạn có mã khuyến mại, hãy nhập vào đây</p>
          <div className="cart-items-promo-box">
            <input type="text" placeholder="Voucher" />
            <button>Áp dụng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
