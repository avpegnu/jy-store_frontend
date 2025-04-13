import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <Ghost className="w-24 h-24 text-gray-400 mb-6" />
      <h1 className="text-4xl font-bold text-gray-700 mb-2">
        404 - Không tìm thấy trang
      </h1>
      <p className="text-gray-600 mb-6">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-950 transition cursor-pointer"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default NotFound;
