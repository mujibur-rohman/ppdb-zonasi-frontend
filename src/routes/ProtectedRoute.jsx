import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../pages/Loading";
import NotFound from "../pages/NotFound";

const ProtectedRoute = ({ role }) => {
  const { user, loading } = useContext(AuthProvider);
  if (loading) return <Loading />;
  if (!user) {
    return <Navigate to="/admin/auth" replace={true} />;
  } else if (role?.includes(user.role)) {
    return <Outlet />;
  }
  return <NotFound />;
};

export default ProtectedRoute;
