import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const profilSekolahEndPoint = "/profile-school";

const APIProfileSch = {
  addProfile: async (formData) => {
    try {
      const profile = await axiosInstance.post(
        profilSekolahEndPoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile Sekolah Berhasil Dibuat");
      return profile.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  update: async (formData) => {
    try {
      const profile = await axiosInstance.put(profilSekolahEndPoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile Sekolah Berhasil Dibuat");
      return profile.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  getOne: async (url) => {
    try {
      const profile = await axiosInstance.get(url);
      return profile.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
};

export default APIProfileSch;
