import axios from "axios";
const authUrl = `http://localhost:8080`;

const emailAPI = axios.create({
  baseURL: authUrl + "/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "true",
  },
});

export const subscribeEmail = async (email) => {
  try {
    const response = await emailAPI.post("/subscribe", { email });
    return response?.data;
  } catch (error) {
    throw error?.response?.data || "Có lỗi xảy ra, vui lòng thử lại!";
  }
};
