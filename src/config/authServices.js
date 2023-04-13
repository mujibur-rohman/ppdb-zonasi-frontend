import { toast } from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

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
      //   if (user) {
      //     Cookies.set("accessToken", user.data.token.accessToken);
      //   }
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
      return me.data;
    } catch (error) {
      console.log(error);
    }
  },
};
