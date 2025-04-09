import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="description-box" style={{ fontFamily: "Roboto" }}>
      <div className="description-box-navigator">
        <div className="description-box-nav-box">Mô tả</div>
        <div className="description-box-nav-box fade">Đánh giá(520)</div>
      </div>
      <div className="description-box-description">
        <p>
          Mình đã mua và sử dụng chiếc áo sơ mi này trong vài tuần và thực sự ấn
          tượng! Chất vải cotton mềm mại, thoáng mát, mặc cả ngày vẫn rất dễ
          chịu. Kiểu dáng slim fit ôm vừa vặn, tôn dáng nhưng không hề gò bó.
          Đặc biệt, đường may rất tỉ mỉ, tạo cảm giác sang trọng và bền bỉ. Dễ
          phối đồ, đi làm hay đi chơi đều phù hợp. Rất đáng tiền, chắc chắn sẽ
          mua thêm màu khác!
        </p>
      </div>
    </div>
  );
};
export default DescriptionBox;
