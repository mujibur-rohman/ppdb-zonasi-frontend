import axiosInstance from "../config/axiosInstance";

export const dashboardEndPoint = "/dashboard";

const DashboardAPI = {
  getStatus: async (url) => {
    try {
      const status = await axiosInstance.get(url);
      return status.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default DashboardAPI;
