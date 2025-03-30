import axios from "axios";
const authUrl = `http://localhost:8080`;

const paymentAPI = axios.create({
  baseURL: authUrl + "/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "true",
  },
});

export const createPaymentRequest = async (data) => {
  try {
    const response = await paymentAPI.post("/create_payment_url", data);
    return response?.data
  } catch (error) {
    return error?.response.data;
  }
}
