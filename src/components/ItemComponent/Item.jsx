import { useState, useEffect } from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { getProductById } from "../../services/product";

const Item = (props) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductById(props.id);
        setProductDetails(data); // Lưu thông tin sản phẩm vào state
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    fetchProductDetails();
  }, [props.id]);

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">{props.new_price}đ</div>
        <div className="item-price-old">{props.old_price}đ</div>
      </div>
    </div>
  );
};

export default Item;
