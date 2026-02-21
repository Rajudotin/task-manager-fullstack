import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-fullstack-production-83d5.up.railway.app/api/v1"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;