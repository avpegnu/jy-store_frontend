import React, { useEffect, useState } from "react";
import "./OrderManagement.css";
import { FiSearch, FiFilter } from "react-icons/fi";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortByTotal, setSortByTotal] = useState(""); // asc | desc

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

      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, order_status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", err);
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchSearch =
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.shipping_address?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter
        ? order.order_status === statusFilter
        : true;

      const matchPayment = paymentFilter
        ? order.payment_method === paymentFilter
        : true;

      const createdAt = new Date(order.createdAt);
      const matchStartDate = startDate
        ? createdAt >= new Date(startDate)
        : true;
      const matchEndDate = endDate ? createdAt <= new Date(endDate) : true;

      return (
        matchSearch &&
        matchStatus &&
        matchPayment &&
        matchStartDate &&
        matchEndDate
      );
    })
    .sort((a, b) => {
      if (!sortByTotal) return 0;
      const totalA = a.order_total;
      const totalB = b.order_total;
      return sortByTotal === "asc" ? totalA - totalB : totalB - totalA;
    });

  if (loading) return <p>Đang tải đơn hàng...</p>;

  return (
    <div className="manage-orders">
      <h2>Quản lý đơn hàng</h2>

      <div className="order-filters">
        <div className="filter-group">
          <FiSearch className="icon" />
          <input
            type="text"
            placeholder="Tìm mã đơn, người nhận..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FiFilter className="icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Đang xử lý</option>
            <option value="shipping">Đang giao hàng</option>
            <option value="completed">Hoàn tất</option>
            <option value="cancelled">Đã huỷ</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Từ ngày</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Đến ngày</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Thanh toán</label>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="cash_on_delivery">Khi nhận hàng</option>
            <option value="VNPay_bank_transfer">VNPay</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sắp xếp</label>
          <select
            value={sortByTotal}
            onChange={(e) => setSortByTotal(e.target.value)}
          >
            <option value="">-- Theo tổng tiền --</option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <p>Không tìm thấy đơn hàng phù hợp.</p>
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
              {filteredOrders.map((order) => (
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
                  <td>{translatePaymentMethod(order.payment_method)}</td>
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
                            {item.new_price &&
                            !isNaN(
                              Number(
                                item.new_price
                                  .replace(/\./g, "")
                                  .replace(",", ".")
                              )
                            )
                              ? Number(
                                  item.new_price
                                    .replace(/\./g, "")
                                    .replace(",", ".")
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })
                              : "Giá không hợp lệ"}
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
