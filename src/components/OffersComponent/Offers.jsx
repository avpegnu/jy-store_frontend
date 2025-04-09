import "./Offers.css";
import exclusive_image from "../../assets/exclusive_image.png";
const Offers = () => {
  return (
    <div className="offers" style={{ fontFamily: "Roboto" }}>
      <div className="offers-left">
        <h1>ƯU ĐÃI</h1>
        <h1>ĐỘC QUYỀN DÀNH CHO BẠN</h1>
        <p>Chỉ dành cho các sản phẩm bán chạy nhất</p>
        <button>Xem ngay bây giờ</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  );
};

export default Offers;
