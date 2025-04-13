import React, { useEffect, useState } from "react";
import "./OrderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/order");
      if (!res.ok) throw new Error("Lỗi khi fetch đơn hàng");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Lỗi khi lấy đơn hàng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // const translateOrderStatus = (status) => {
  //   switch (status) {
  //     case "pending":
  //       return "Đang xử lý";
  //     case "shipping":
  //       return "Đang giao hàng";
  //     case "completed":
  //       return "Hoàn tất";
  //     case "cancelled":
  //       return "Đã huỷ";
  //     default:
  //       return "Không xác định";
  //   }
  // };

  const translatePaymentMethod = (method) => {
    switch (method) {
      case "cash_on_delivery":
        return "Thanh toán khi nhận hàng";
      case "VNPay_bank_transfer":
        return "VNPay";
      default:
        return "Chưa chọn phương thức";
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/order/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Lỗi khi cập nhật trạng thái");

      // Cập nhật lại danh sách đơn hàng sau khi thay đổi trạng thái
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, order_status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", err);
    }
  };

  if (loading) return <p>Đang tải đơn hàng...</p>;

  return (
    <div className="manage-orders">
      <h2>Quản lý đơn hàng</h2>
      {orders.length === 0 ? (
        <p>Hiện tại không có đơn hàng nào.</p>
      ) : (
        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Tổng tiền</th>
                <th>Địa chỉ giao hàng</th>
                <th>Phương thức thanh toán</th>
                <th>Sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <select
                      value={order.order_status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">Đang xử lý</option>
                      <option value="shipping">Đang giao hàng</option>
                      <option value="completed">Hoàn tất</option>
                      <option value="cancelled">Đã huỷ</option>
                    </select>
                  </td>
                  <td>{Number(order.order_total).toLocaleString()} VND</td>
                  <td>
                    {order.shipping_address ? (
                      <>
                        Người nhận: {order.shipping_address.name}
                        <br />
                        Địa chỉ: {order.shipping_address.address},{" "}
                        {order.shipping_address.ward},{" "}
                        {order.shipping_address.district},{" "}
                        {order.shipping_address.city} <br />
                        SĐT: {order.shipping_address.phone}
                      </>
                    ) : (
                      <p>Không có địa chỉ</p>
                    )}
                  </td>
                  <td>
                    {translatePaymentMethod(order.payment_method) || "Chưa chọn"}
                  </td>
                  <td>
                    {order.order_items && order.order_items.length > 0 ? (
                      <ul>
                        {order.order_items.map((item, index) => (
                          <li key={index} className="product-item">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="product-image"
                            />
                            <strong>{item.name}</strong> Size: {item.size} - Số
                            lượng: {item.quantity} - Giá:{" "}
                            {item.new_price && !isNaN(Number(item.new_price))
                              ? Number(
                                  item.new_price
                                    .replace(/\./g, "")
                                    .replace(",", ".")
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })
                              : "Giá không hợp lệ"}{" "}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Không có sản phẩm nào trong đơn hàng này.</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
