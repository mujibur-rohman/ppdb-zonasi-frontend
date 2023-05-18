import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const documentEndPoint = "/document";

const APIDocument = {
  addDocument: async (formData) => {
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
  updateDocument: async (id, formData) => {
    try {
      const jurusan = await axiosInstance.put(
        `${documentEndPoint}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Document Berhasil Dikirim");
      return jurusan.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
};

export default APIDocument;
