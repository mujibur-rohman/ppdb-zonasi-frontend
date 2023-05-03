import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../pages/Loading";
import NotFound from "../pages/NotFound";

const SecretRoute = ({ role }) => {
  const { user, loading, school } = useContext(AuthProvider);

  if (loading) return <Loading />;
  if (!user) {
    return <Navigate to="/admin/auth" replace={true} />;
  } else if (role?.includes(user.role)) {
    if (school) {
      return <Navigate to="/admin" replace={true} />;
    }
    return <Outlet />;
  }
  return <NotFound />;
};

export default SecretRoute;
