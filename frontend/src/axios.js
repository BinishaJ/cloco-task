import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;
