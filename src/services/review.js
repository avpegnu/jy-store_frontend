import axios from "axios";

const authUrl = `http://localhost:8080`;

const reviewAPI = axios.create({
  baseURL: authUrl + "/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    //"Access-Control-Allow-Origin": "true",
  },
});

// Gửi đánh giá
export const createReview = async (reviewData) => {
  try {
    const response = await reviewAPI.post("/review", reviewData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi đánh giá:", error);
    console.log("Chi tiết lỗi:", error.response?.data);
    throw error;
  }
};

// Lấy đánh giá theo sản phẩm
export const getReviewsByProductId = async (productId) => {
  try {
    const response = await reviewAPI.get(`/review/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
    throw error;
  }
};
