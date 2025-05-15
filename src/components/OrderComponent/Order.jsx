import { useEffect, useState } from "react";
import {
  getOrdersByUserId,
  updatePaymentStatus,
  updateOrderStatus,
} from "../../services/order";
import moment from "moment";
import { Link } from "react-router-dom";
import RatingModal from "../RatingModalComponent/RatingModal";
import { createReview } from "../../services/review";

const statusLabels = {
  pending: "🔄 Đang xử lý",
  shipping: "🚚 Đang giao",
  completed: "✅ Đã hoàn tất",
  cancelled: "❌ Đã huỷ",
  reviewed: "⭐ Đã đánh giá", // Thêm trạng thái 'reviewed'
};

const translatePaymentMethod = (method) => {
  switch (method) {
    case "cash_on_delivery":
      return "Thanh toán khi nhận hàng";
    case "VNPay_bank_transfer":
      return "VNPAY";
    default:
      return "Khác";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-500 bg-yellow-100";
    case "shipping":
      return "text-blue-500 bg-blue-100";
    case "completed":
      return "text-green-600 bg-green-100";
    case "cancelled":
      return "text-red-500 bg-red-100";
    case "reviewed":
      return "text-gray-500 bg-gray-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currentReviewProduct, setCurrentReviewProduct] = useState(null);

  const [reviewedProducts, setReviewedProducts] = useState(new Set());
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?._id;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrdersByUserId(user_id);
      setOrders(data);
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReceived = async (orderId) => {
    try {
      setUpdatingId(orderId);
      await updatePaymentStatus(orderId, "completed");
      await fetchOrders();
    } catch (err) {
      alert("Không thể cập nhật trạng thái đơn hàng.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleConfirmCancelled = async () => {
    if (!selectedOrderId) return;
    try {
      setUpdatingId(selectedOrderId);
      await updateOrderStatus(selectedOrderId, "cancelled");
      setShowCancelModal(false);
      await fetchOrders();
    } catch (err) {
      alert("Không thể cập nhật trạng thái đơn hàng.");
    } finally {
      setUpdatingId(null);
      setSelectedOrderId(null);
    }
  };

  const handleOpenReview = (product) => {
    setCurrentReviewProduct(product);
    setShowRatingModal(true);
  };
  console.log("currentReviewProduct", currentReviewProduct);
  const handleSubmitReview = async (reviewData) => {
    try {
      Promise.all([
        createReview({ ...reviewData, user_id }),
        updateOrderStatus(currentReviewProduct._id, "reviewed"),
      ]);
      // Cập nhật lại danh sách đơn hàng trong state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === currentReviewProduct._id
            ? { ...order, order_status: "reviewed" }
            : order
        )
      );

      setReviewSuccess(true);
      setShowRatingModal(false);
      setTimeout(() => setReviewSuccess(false), 3000); // Tự động ẩn thông báo sau 3s
    } catch (err) {
      console.error("Lỗi gửi đánh giá:", err);
    }
  };

  useEffect(() => {
    if (user_id) fetchOrders();
  }, [user_id]);

  if (!user_id)
    return (
      <p className="text-center mt-10">Vui lòng đăng nhập để xem đơn hàng.</p>
    );
  if (loading) return <p className="text-center mt-10">Đang tải đơn hàng...</p>;

  const filteredOrders = orders.filter(
    (order) => order.order_status === selectedStatus
  );

  return (
    <>
      {reviewSuccess && (
        <div className="text-green-600 mt-4">
          Đánh giá thành công! Cảm ơn bạn đã chia sẻ ý kiến.
        </div>
      )}

      <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="md:w-1/4">
          <h2 className="text-xl font-bold mb-4">Trạng thái</h2>
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-col">
            {Object.entries(statusLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedStatus(key)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-left font-medium border ${
                  selectedStatus === key
                    ? "bg-blue-900 text-white border-black-900 cursor-default"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders list */}
        <div className="md:w-3/4">
          <h2 className="text-2xl font-bold mb-4">
            {statusLabels[selectedStatus]}
          </h2>

          {filteredOrders.length === 0 ? (
            <p className="text-gray-500 italic">Không có đơn hàng nào.</p>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm bg-white transition hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:justify-between mb-4">
                  <div className="space-y-1">
                    <p>
                      <span className="font-semibold">Mã đơn hàng:</span>{" "}
                      {order._id}
                    </p>
                    <p>
                      <span className="font-semibold">Trạng thái:</span>{" "}
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-md ${getStatusColor(
                          order.order_status
                        )}`}
                      >
                        {statusLabels[order.order_status]}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Thanh toán:</span>{" "}
                      {translatePaymentMethod(order.payment_method)} (
                      {order.payment_status === "pending"
                        ? "Chưa thanh toán"
                        : "Đã thanh toán"}
                      )
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-sm text-gray-500">
                    <p>
                      <span className="font-semibold">Ngày đặt:</span>{" "}
                      {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                    <p>
                      <span className="font-semibold">Tổng tiền:</span>{" "}
                      <span className="text-red-500 font-bold">
                        {Number(order.order_total).toLocaleString()} VND
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold">Địa chỉ giao hàng:</h4>
                  <p>{order.shipping_address?.address}</p>
                  <p>
                    {order.shipping_address?.ward} -{" "}
                    {order.shipping_address?.district} -{" "}
                    {order.shipping_address?.city}
                  </p>
                </div>

                <div className="mt-3">
                  <h4 className="font-semibold mb-2">Sản phẩm:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {order.order_items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 border rounded-lg p-3 hover:bg-gray-50 transition"
                      >
                        <Link to={`/product/${item._id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                        </Link>
                        <div className="flex-1 text-sm space-y-1">
                          <p className="font-medium text-base">{item.name}</p>
                          <p>
                            Size:{" "}
                            <span className="font-semibold">{item.size}</span>
                          </p>
                          <p>
                            Số lượng:{" "}
                            <span className="font-semibold">
                              {item.quantity}
                            </span>
                          </p>
                          <p>
                            Giá:{" "}
                            <span className="text-green-600">
                              {item.new_price} VND
                            </span>
                          </p>
                          {order.order_status === "completed" &&
                            !reviewedProducts.has(item._id) && (
                              <button
                                onClick={() => handleOpenReview(item)}
                                className="mt-2 px-3 py-1 rounded bg-blue-800 text-white hover:bg-blue-900 text-sm"
                              >
                                Đánh giá
                              </button>
                            )}
                          {reviewedProducts.has(item._id) && (
                            <button className="mt-2 px-3 py-1 rounded bg-blue-800 text-white hover:bg-blue-900 text-sm">
                              Mua lại
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 text-right">
                  {order.order_status === "completed" ? (
                    <></>
                  ) : (
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleConfirmReceived(order._id)}
                        disabled={order.order_status !== "shipping"}
                        className={`px-4 py-2 rounded-lg font-semibold text-white ${
                          order.order_status !== "shipping"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 cursor-pointer"
                        }`}
                      >
                        Đã nhận hàng
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrderId(order._id);
                          setShowCancelModal(true);
                        }}
                        disabled={order.order_status !== "pending"}
                        className={`px-4 py-2 rounded-lg font-semibold text-white ${
                          order.order_status !== "pending"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 cursor-pointer"
                        }`}
                      >
                        Hủy đơn hàng
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal huỷ đơn */}
      {showCancelModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">
              Xác nhận huỷ đơn hàng
            </h2>
            <p className="text-gray-600 mb-6">
              Bạn chắc chắn muốn huỷ đơn hàng này chứ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedOrderId(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-medium"
              >
                Không
              </button>
              <button
                onClick={handleConfirmCancelled}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal đánh giá */}
      {showRatingModal && (
        <RatingModal
          product={currentReviewProduct}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </>
  );
};

export default Order;
