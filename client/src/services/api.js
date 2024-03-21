import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});


api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refresh");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    if (refreshToken) {
      config.headers["X-Refresh-Token"] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;