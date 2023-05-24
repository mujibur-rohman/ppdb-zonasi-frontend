import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const pendaftaranEndPoint = "/pendaftaran";

const APIPendaftaran = {
  get: async (url, navigate) => {
    try {
      const data = await axiosInstance.get(url);
      return data.data;
    } catch (error) {
      console.log(error);
      navigate("/", { replace: true });
    }
  },

  qualification: async (url) => {
    try {
      const data = await axiosInstance.get(url);
      return data.data;
    } catch (error) {
      console.log(error);
      navigate("/", { replace: true });
    }
  },

  sendEmail: async () => {
    try {
      const data = await axiosInstance.post("/qualification/send-email");
      toast.success("Email berhasil dikirim");
      return data.data;
    } catch (error) {
      console.log(error);
      navigate("/", { replace: true });
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

  updateStatus: async (id) => {
    try {
      const data = await axiosInstance.put(
        `/status${pendaftaranEndPoint}/${id}`
      );
      return data.data;
    } catch (error) {
      console.log(error);
    }
  },

  updateData: async ({ id, ...payload }, navigate, document) => {
    try {
      const data = await axiosInstance.put(
        `${pendaftaranEndPoint}/${id}`,
        payload
      );
      if (document === null) {
        navigate("/form-register/berkas");
      } else {
        navigate("/form-register/berkas-edit");
      }
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  deletePendaftaran: async (id) => {
    try {
      const pendaftaran = await axiosInstance.delete(
        `${pendaftaranEndPoint}/${id}`
      );
      toast.success("Pendaftaran Berhasil Dibatalkan");
      return pendaftaran.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
};

export default APIPendaftaran;
