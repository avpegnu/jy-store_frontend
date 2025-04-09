import "./Breadcrum.css";
import arrow_icon from "../../assets/breadcrum_arrow.png";

const Breadcrum = (props) => {
  const { product } = props;

  // Nếu chưa có product, không render gì cả hoặc render dòng loading
  if (!product) {
    return <div className="breadcrum">Đang tải thông tin sản phẩm...</div>;
  }

  return (
    <div className="breadcrum" style={{ fontFamily: "Roboto" }}>
      JYSTORE <img src={arrow_icon} alt=">" /> Trang chủ{" "}
      <img src={arrow_icon} alt=">" /> {product.category}{" "}
      <img src={arrow_icon} alt=">" /> {product.name}{" "}
    </div>
  );
};

export default Breadcrum;
