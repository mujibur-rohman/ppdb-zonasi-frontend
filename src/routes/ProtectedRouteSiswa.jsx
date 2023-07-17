import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../pages/Loading";
import NotAuthorization from "../pages/NotAuthorization";
import EmailVerification from "../pages/siswa/EmailVerification";

const ProtectedRouteSiswa = ({ role }) => {
  const { user, loading } = useContext(AuthProvider);
  if (loading) return <Loading />;
  if (!user) {
    return <Navigate to="/auth" replace={true} />;
  } else if (role?.includes(user.role)) {
    if (user.isEmailVerified) {
      return <Outlet />;
    }
    return <Navigate to={`/verify-email/${user.uuid}`} replace={true} />;
  }
  return <NotAuthorization />;
};

export default ProtectedRouteSiswa;
