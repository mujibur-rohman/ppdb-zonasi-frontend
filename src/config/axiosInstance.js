import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (e) => {
//     return Promise.reject(e);
//   }
// );

export default axiosInstance;
