import { createContext, useEffect, useState } from "react";
import { Auth } from "../config/authServices";

export const AuthProvider = createContext({});

const AuthContext = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      await Auth.Me()
        .then((user) => setUser(user))
        .catch((err) => console.log(err));
      setLoading(false);
    };
    fetchUser();
  }, []);
  return (
    <AuthProvider.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
