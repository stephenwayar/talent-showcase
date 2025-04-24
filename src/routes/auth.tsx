import { useAppState } from "@/hooks/useAppState";
import { Navigate, Outlet } from "react-router-dom";

// Route wrapper for unauthenticated users (to prevent accessing auth pages when logged in)
const AuthRoute = () => {
  const { user } = useAppState();

  if (user) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default AuthRoute