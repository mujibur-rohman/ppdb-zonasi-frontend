import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const documentEndPoint = "/document";

const APIDocument = {
  //   getJurusan: async (url) => {
  //     try {
  //       const jurusan = await axiosInstance.get(url);
  //       return jurusan.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  addDocument: async (formData) => {
    console.log(formData);
    try {
      const jurusan = await axiosInstance.post(documentEndPoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Pendaftaran Berhasil Dikirim");
      return jurusan.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
};

export default APIDocument;
