import axios from "axios";
const authUrl = import.meta.env.VITE_BE_URL || "http://localhost:8080";
const api = axios.create({
  baseURL: authUrl + "/",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const loginAdmin = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const getAllAccounts = () => {
  return api.get("/auth/accounts");
};

export const updateAccount = (id, updateData) => {
  return api.put(`/auth/update/${id}`, updateData);
};
