import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./Revenue.css";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("day");

  useEffect(() => {
    fetchRevenue(type);
  }, [type]);

  const fetchRevenue = async (selectedType) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/order/revenue/get?type=${selectedType}`
      );
      const data = await res.json();

      console.log("🚀 Revenue data:", data.revenue);

      const mappedData = data.revenue.map((item) => ({
        name: getLabel(item._id, selectedType),
        total: Number(item.total),
      }));
      console.log("🚀 Mapped data:", mappedData);

      setRevenueData(mappedData);
    } catch (err) {
      console.error("Lỗi khi lấy doanh thu:", err);
    } finally {
      setLoading(false);
    }
  };

  const getLabel = (id, type) => {
    if (!id && id !== 0) return "";

    switch (type) {
      case "day":
        return `${id}h`; // 0 - 23
      case "week": {
        const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        return days[id] || `${id}`;
      }
      case "month":
        return `${id}`; // 1 - 5
      case "year":
        return `${id}`; // 1 - 12
      default:
        return id;
    }
  };

  return (
    <div className="revenue">
      <h2>Thống kê doanh thu</h2>

      <div className="revenue-filter">
        <label htmlFor="type">Xem theo:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="day">Hôm nay</option>
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) => {
                const numValue = Number(value);
                if (!isNaN(numValue)) {
                  // Định dạng tiền theo đồng VND
                  const formattedValue = new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    maximumFractionDigits: 0,
                  }).format(numValue / 1000); // Chia cho 1000 để chuyển thành nghìn đồng

                  // Thêm "K" sau số tiền đã định dạng
                  return formattedValue.replace("₫", "") + "K₫"; // Thêm K sau giá trị tiền tệ
                }
                return value;
              }}
            />

            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Revenue;
