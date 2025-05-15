import { useState } from "react";

const RatingModal = ({ product, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      alert("Vui lòng đánh giá và viết nhận xét.");
      return;
    }
    onSubmit({
      product_id: product._id,
      rating,
      comment,
    });
    onClose(); // đóng modal sau khi gửi
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Đánh giá sản phẩm</h2>
        <p className="text-gray-700">{product.name}</p>
        <div className="flex space-x-1 text-yellow-500 text-xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          rows="4"
          placeholder="Viết nhận xét của bạn..."
          className="w-full border rounded-md p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
