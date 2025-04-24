import { useAppState } from "@/hooks/useAppState";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Protected route wrapper for authenticated users
const ProtectedRoute = () => {
  const { user } = useAppState();
  const location = useLocation();

  if (!user) {
    // Encode the pathname to handle special characters properly
    const encodedPathname = encodeURIComponent(location.pathname);
    return <Navigate to={`/auth/login?redirect=${encodedPathname}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute