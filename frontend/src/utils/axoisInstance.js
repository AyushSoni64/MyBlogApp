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
    console.log("from axois:::>>>", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    console.log("Inside response interceptor");
    console.log(status);
    if (status === 401) {
      console.log("function called");
      getGlobalLogout()();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
