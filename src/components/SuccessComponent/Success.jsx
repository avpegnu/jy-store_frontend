import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Về trang chủ sau 5s
    }, 15000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-blue-50 px-4 p-0">
      <CheckCircle className="text-blue-200 w-24 h-24 mb-6" />
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        Đặt hàng thành công!
      </h1>
      <p className="text-gray-700 text-center mb-4">
        Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.
      </p>
      <p className="text-sm text-gray-500">
        Bạn sẽ được chuyển về trang chủ trong giây lát...
      </p>
    </div>
  );
};

export default Success;
