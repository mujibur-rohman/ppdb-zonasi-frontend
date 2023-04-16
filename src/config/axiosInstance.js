import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
