import axios from "axios";
const authUrl = `http://localhost:8080`;

const authAPI = axios.create({
  baseURL: authUrl + "/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "true",
  },
});

export const handleRegister = async (data) => {
  try {
    const response = await authAPI.post("/auth/signup", data);
    return response?.data;
  } catch (error) {
    return error?.response;
  }
};

export const handleLoginAccount = async (data) => {
  try {
    const response = await authAPI.post("/auth/login", data);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
};

export const changePassword = async (account_id, password, exPassword) => {
  try {
    const response = await authAPI.put("/auth/change-password", {
      account_id,
      password,
      current: exPassword,
    });
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
};
