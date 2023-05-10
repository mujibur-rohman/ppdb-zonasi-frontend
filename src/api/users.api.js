import { toast } from "react-hot-toast";
import axiosInstance from "../config/axiosInstance";

export const usersEndPoint = "/users";

const APIUsers = {
  getUsers: async (url, token) => {
    try {
      const user = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return user.data;
    } catch (error) {
      console.log(error);
    }
  },
  sendEmail: async (id) => {
    try {
      const user = await axiosInstance.post(
        `${usersEndPoint}/send-email/${id}`
      );
      return user.data;
    } catch (error) {
      console.log(error);
    }
  },
  verifyEmail: async (id) => {
    try {
      const user = await axiosInstance.post(
        `${usersEndPoint}/verify-email/${id}`
      );
      console.log(user);
      return user.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  deleteUsers: async (id) => {
    try {
      const user = await axiosInstance.delete(`${usersEndPoint}/${id}`);
      toast.success("User Berhasil Dihapus");
      return user.data;
    } catch (error) {
      console.log(error);
    }
  },
  addUsers: async ({ fullName, role, email, password }) => {
    try {
      const user = await axiosInstance.post(usersEndPoint, {
        fullName,
        role,
        email,
        password,
      });
      toast.success("User Berhasil Ditambahkan");
      return user.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  changePassword: async ({ newPassword, id }) => {
    try {
      const user = await axiosInstance.put(
        `${usersEndPoint}/change-password/${id}`,
        {
          newPassword,
        }
      );
      toast.success("Password Berhasil Diubah");
      return user.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
};

export default APIUsers;
