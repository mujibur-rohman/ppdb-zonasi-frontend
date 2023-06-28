import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL_API } from "../constants/baseUrlAPI";

const token = Cookies.get("accessToken");

const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
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
