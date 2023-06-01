import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Loading from "../pages/Loading";

const EmailVerifyRoute = () => {
  const { user, loading } = useContext(AuthProvider);
  if (loading) return <Loading />;
  if (!user) {
    return <Navigate to="/auth" replace={true} />;
  }
  if (user.isEmailVerified) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

export default EmailVerifyRoute;
