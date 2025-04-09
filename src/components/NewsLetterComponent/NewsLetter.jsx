import "./NewsLetter.css";
import { useState } from "react";
import { subscribeEmail } from "../../services/email";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubscribe = async () => {
    if (!email) {
      alert("Vui lòng nhập email!");
      return;
    }

    setLoading(true);
    try {
      const response = await subscribeEmail(email);
      alert(response.message);
    } catch (error) {
      console.error("Lỗi:", error);
      alert(error);
    } finally {
      setLoading(false);
      setEmail(""); // Reset input sau khi gửi
    }
  };
  return (
    <div className="newsletter">
      <h1>Nhận Ưu Đãi Độc Quyền Qua Email Của Bạn</h1>
      <p>Đăng ký để nhận thông báo của chúng tôi khi có sản phẩm mới</p>
      <div>
        <input
          type="email"
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleSubscribe} disabled={loading}>
          {loading ? "Đang gửi..." : "Đăng ký"}
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
