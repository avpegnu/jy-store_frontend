import { useState, useEffect } from "react";
import { createReview, getReviewsByProductId } from "../../services/review"; // Đảm bảo có hàm API lấy đánh giá sản phẩm
import "./DescriptionBox.css";

const DescriptionBox = ({ productId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]); // Lưu trữ các đánh giá
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description"); // Thêm state để kiểm soát tab đang hiển thị

  const handleSubmitReview = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Vui lòng đăng nhập.");

    const reviewData = {
      user_id: user._id,
      product_id: productId,
      rating,
      comment,
    };

    try {
      await createReview(reviewData); // Gọi API để lưu đánh giá vào backend
      alert("Đánh giá đã được gửi!");

      // Reset form và ẩn form đánh giá
      setShowReviewForm(false);
      setRating(5);
      setComment("");

      // Cập nhật lại danh sách đánh giá
      fetchReviews();
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByProductId(productId); // Gọi API lấy đánh giá
      setReviews(data);
    } catch (error) {
      console.error("Lỗi khi lấy đánh giá:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(); // Lấy các đánh giá khi component được mount
  }, [productId]);

  return (
    <div className="description-box" style={{ fontFamily: "Roboto" }}>
      <div className="description-box-navigator">
        <div
          className={`description-box-nav-box ${
            activeTab === "description" ? "active" : ""
          }`}
          onClick={() => setActiveTab("description")} // Chuyển sang tab mô tả
        >
          Mô tả
        </div>
        <div
          className={`description-box-nav-box ${
            activeTab === "reviews" ? "active" : ""
          }`}
          onClick={() => setActiveTab("reviews")} // Chuyển sang tab đánh giá
        >
          Đánh giá({reviews.length})
        </div>
      </div>

      {/* Hiển thị nội dung dựa trên tab đang active */}
      {activeTab === "description" && (
        <div className="description-box-description">
          <p>
            Chiếc áo sơ mi cao cấp được thiết kế với phong cách hiện đại, tinh
            tế, mang lại sự tự tin và lịch lãm cho người mặc. Chất liệu cotton
            thoáng mát, thấm hút mồ hôi tốt, phù hợp cho cả đi làm và đi chơi.
            Đường may tỉ mỉ, form dáng chuẩn form người Việt giúp bạn luôn nổi
            bật trong mọi hoàn cảnh.
          </p>
          <p>
            Sản phẩm đa dạng màu sắc và kích cỡ, dễ dàng phối đồ với quần jean,
            kaki hay vest. Đây là lựa chọn lý tưởng cho những ai đang tìm kiếm
            sự kết hợp giữa sự thoải mái và thời trang.
          </p>
          <p>
            Hướng dẫn bảo quản: Giặt ở nhiệt độ thường, không sử dụng thuốc tẩy,
            ủi ở nhiệt độ thấp và tránh phơi dưới ánh nắng trực tiếp.
          </p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="reviews">
          {/* Hiển thị form đánh giá nếu đang bật */}
          {showReviewForm && (
            <div className="review-form">
              <h3 className="review-form-title">Đánh giá sản phẩm</h3>
              <div className="review-form-group">
                <label>Đánh giá (1-5):</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </div>
              <div className="review-form-group">
                <label>Bình luận:</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button
                onClick={handleSubmitReview}
                className="review-submit-btn"
              >
                Gửi đánh giá
              </button>
            </div>
          )}

          {loading ? (
            <p>Đang tải đánh giá...</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-user-top">
                  {review.user_id?.name || "Người dùng ẩn danh"}
                </div>
                <div className="review-header">
                  <span className="review-rating">⭐ {review.rating} / 5</span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
