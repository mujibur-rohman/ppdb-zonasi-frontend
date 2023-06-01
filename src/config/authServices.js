import { toast } from "react-hot-toast";
import axiosInstance from "./axiosInstance";

export const authEndPoint = "/auth";

export const Auth = {
  Login: async (email, password) => {
    try {
      const user = await axiosInstance.post(
        `${authEndPoint}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      return user.data;
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  },
  RegisterSiswa: async ({ email, password, fullName }) => {
    try {
      const user = await axiosInstance.post(`${authEndPoint}/register`, {
        fullName,
        email,
        password,
      });
      return user.data;
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  },
  LoginSiswa: async (email, password) => {
    try {
      const user = await axiosInstance.post(
        `/siswa${authEndPoint}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      return user.data;
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  },
  Me: async () => {
    try {
      const me = await axiosInstance.get("/me", { withCredentials: true });
      if (me) {
        return me.data.user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  },
  MySchool: async () => {
    try {
      const me = await axiosInstance.get("/profile-school");
      if (me) {
        return me.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
