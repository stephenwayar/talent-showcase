import { getCookieItem } from "@/helpers/functions/cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Protected route wrapper for authenticated users
const ProtectedRoute = () => {
  const location = useLocation();
  const user = getCookieItem('session-user');

  if (!user) {
    // Encode the pathname to handle special characters properly
    const encodedPathname = encodeURIComponent(location.pathname);
    return <Navigate to={`/auth/login?redirect=${encodedPathname}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute