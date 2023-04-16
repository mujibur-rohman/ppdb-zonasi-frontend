import axiosInstance from "../config/axiosInstance";

export const usersEndPoint = "/users";

const APIUsers = {
  getUsers: async (url) => {
    try {
      const user = await axiosInstance.get(url);
      return user.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default APIUsers;
