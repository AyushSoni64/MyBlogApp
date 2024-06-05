import axios from "axios";
import { getGlobalLogout } from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      getGlobalLogout()();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
