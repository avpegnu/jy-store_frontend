import axios from "axios";
const authUrl = `http://localhost:8080`;

const orderAPI = axios.create({
  baseURL: authUrl + "/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "true",
  },
});

export const createOrder = async (orderData) => {
  try {
    const response = await orderAPI.post("/order", orderData);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || "Có lỗi xảy ra, vui lòng thử lại!";
  }
};

export const updatePaymentStatus = async (orderId, status) => {
  try {
    const response = await orderAPI.put(`/order/${orderId}`, { status });
    return response?.data;
  } catch (error) {
    throw error?.response?.data || "Không thể cập nhật trạng thái đơn hàng.";
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await orderAPI.put(`/order/status/${orderId}`, { status });
    return response?.data;
  } catch (error) {
    throw error?.response?.data || "Không thể cập nhật trạng thái đơn hàng.";
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await orderAPI.get(`/order/user/${userId}`);
    return response?.data;
  } catch (error) {
    throw error?.response?.data || "Không thể lấy danh sách đơn hàng.";
  }
};
