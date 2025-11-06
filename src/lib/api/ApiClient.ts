import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Backend NestJS chạy ở đây
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
