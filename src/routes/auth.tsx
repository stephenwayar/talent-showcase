import { getCookieItem } from "@/helpers/functions/cookie";
import { Navigate, Outlet } from "react-router-dom";

// Route wrapper for unauthenticated users (to prevent accessing auth pages when logged in)
const AuthRoute = () => {
  const user = getCookieItem('session-user');

  if (user) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default AuthRoute