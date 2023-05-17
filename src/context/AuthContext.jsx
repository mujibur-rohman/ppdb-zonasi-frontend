import { createContext, useEffect, useState } from "react";
import { Auth } from "../config/authServices";
import APIRegPeriod, {
  registerPeriodeEndPoint,
} from "../api/periode-pendaftaran.api";

export const AuthProvider = createContext({});

const AuthContext = ({ children }) => {
  const [user, setUser] = useState();
  const [school, setSchool] = useState();
  const [periodePendaftaran, setPeriodePendaftaran] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      await Auth.Me()
        .then((user) => setUser(user))
        .catch((err) => console.log(err));
      await Auth.MySchool().then((sch) => setSchool(sch));
      setLoading(false);
    };
    const fetchPeriode = async () => {
      await APIRegPeriod.getAll(
        `${registerPeriodeEndPoint}/now/${new Date().getFullYear()}`
      )
        .then((per) => setPeriodePendaftaran(per))
        .catch((err) => console.log(err));
    };
    fetchUser();
    fetchPeriode();
  }, []);
  return (
    <AuthProvider.Provider
      value={{ user, loading, setUser, school, periodePendaftaran }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
