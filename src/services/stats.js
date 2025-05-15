import axios from "axios";

const authUrl = import.meta.env.VITE_BE_URL || "http://localhost:8080";
const api = axios.create({
  baseURL: authUrl + "/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getRevenueStats = (type, params = {}) => {
  return api.get("/revenue", {
    params: {
      type,
      ...params,
    },
  });
};

export const getCategoryRevenueStats = (type, params = {}) => {
  return api.get("/revenue-by-category", {
    params: {
      type,
      ...params,
    },
  });
};
