import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../pages/Loading";

const PrivateRouteSiswa = () => {
  const { user, loading } = useContext(AuthProvider);
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <Navigate to="/" replace={true} />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRouteSiswa;
