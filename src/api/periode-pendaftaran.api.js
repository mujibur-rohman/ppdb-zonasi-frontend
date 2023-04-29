import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const registerPeriodeEndPoint = "/register-periode";

const APIRegPeriod = {
  getAll: async (url) => {
    try {
      const data = await axiosInstance.get(url);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  },
  addData: async ({ tahunAjaran, startDate, endDate, userId }) => {
    try {
      const data = await axiosInstance.get(url);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default APIRegPeriod;
