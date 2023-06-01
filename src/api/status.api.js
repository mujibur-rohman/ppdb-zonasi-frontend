import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const statusEndPoint = "/verification-status";

const APIStatus = {
  selectionPendaftaran: async (id) => {
    try {
      const status = await axiosInstance.post(`${statusEndPoint}/${id}`);
      toast.success("Status Berhasil Di Update");
      return status.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  decline: async (id) => {
    try {
      const status = await axiosInstance.post(
        `${statusEndPoint}/decline/${id}`
      );
      toast.success("Pendaftaran Berhasil Di Tolak");
      return status.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
};

export default APIStatus;
