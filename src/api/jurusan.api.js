import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const jurusanEndPoint = "/jurusan";

const APIJurusan = {
  getJurusan: async (url) => {
    try {
      const jurusan = await axiosInstance.get(url);
      return jurusan.data;
    } catch (error) {
      console.log(error);
    }
  },
  addJurusan: async ({ name }) => {
    try {
      const jurusan = await axiosInstance.post(jurusanEndPoint, { name });
      toast.success("Jurusan Berhasil Ditambahkan");
      return jurusan.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
  editJurusan: async ({ name, id }) => {
    try {
      const jurusan = await axiosInstance.put(`${jurusanEndPoint}/${id}`, {
        name,
      });
      toast.success("Jurusan Berhasil Diupdate");
      return jurusan.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
  deleteJurusan: async (id) => {
    try {
      const jurusan = await axiosInstance.delete(`${jurusanEndPoint}/${id}`);
      toast.success("Jurusan Berhasil Dihapus");
      return jurusan.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
};

export default APIJurusan;
