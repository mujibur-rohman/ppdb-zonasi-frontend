import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const pendaftaranEndPoint = "/pendaftaran";

const APIPendaftaran = {
  get: async (url) => {
    try {
      const data = await axiosInstance.get(url);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  },

  getByUser: async (url, body) => {
    try {
      const data = await axiosInstance.get(url, body);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  },

  addData: async (payload, navigate) => {
    try {
      const data = await axiosInstance.post(pendaftaranEndPoint, payload);
      navigate("/form-register/berkas");
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  updateData: async ({ id, ...payload }, navigate) => {
    try {
      const data = await axiosInstance.put(
        `${pendaftaranEndPoint}/${id}`,
        payload
      );
      navigate("/form-register/berkas");
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
};

export default APIPendaftaran;
