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
  addData: async (
    { tahunAjaran, startDate, endDate, userId, kuota, maxDistance },
    navigate
  ) => {
    try {
      const data = await axiosInstance.post(registerPeriodeEndPoint, {
        tahunAjaran,
        startDate,
        endDate,
        userId,
        kuota,
        maxDistance,
      });
      toast.success("Periode Pendaftaran Sukses Dibuat");
      navigate("/admin/periode-pendaftaran");
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
  editData: async (
    { tahunAjaran, startDate, endDate, userId, kuota, id, maxDistance },
    navigate
  ) => {
    try {
      const data = await axiosInstance.put(`${registerPeriodeEndPoint}/${id}`, {
        tahunAjaran,
        startDate,
        endDate,
        userId,
        kuota,
        maxDistance,
      });
      toast.success("Periode Pendaftaran Berhasil Diubah");
      navigate("/admin/periode-pendaftaran");
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },

  deleteData: async (id) => {
    try {
      const data = axiosInstance.delete(`${registerPeriodeEndPoint}/${id}`);
      toast.success("Periode Pendaftaran Berhasil Dihapus");
      return data.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
};

export default APIRegPeriod;
