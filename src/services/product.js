import axios from "axios";
const authUrl = `http://localhost:8080`;

const productAPI = axios.create({
  baseURL: authUrl + "/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "true",
  },
});

export const getAllProducts = async () => {
  try {
    const response = await productAPI.get("/allproducts");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy tất cả sản phẩm:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await productAPI.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    throw error;
  }
};
