import { createContext, useEffect, useState } from "react";
import { Auth } from "../config/authServices";

export const AuthProvider = createContext({});

const AuthContext = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      await Auth.Me()
        .then((user) => setUser(user))
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, []);
  console.log(user);
  return <AuthProvider.Provider value={user}>{children}</AuthProvider.Provider>;
};

export default AuthContext;
