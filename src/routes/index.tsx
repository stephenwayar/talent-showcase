import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/auth/LoginPage';
import LandingPage from '@/pages/home/LandingPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import AccountLayout from '@/layouts/AccountLayout';
import AccountPage from '@/pages/account/AccountPage';
import PostsPage from '@/pages/account/PostsPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import UserProfilePage from '@/pages/users/UserProfilePage';
import { getCookieItem } from '@/helpers/functions/cookie';
import { Navigate, Outlet, RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';

// Route wrapper for unauthenticated users (to prevent accessing auth pages when logged in)
const AuthRoute = () => {
  const user = getCookieItem('session-user');

  if (user) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

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

const router = createBrowserRouter([
  // Public landing page
  {
    path: '/',
    element: <LandingPage />,
  },

  // Auth routes - accessible only when not authenticated
  {
    element: <AuthRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/login',
            element: <LoginPage />,
          },
          {
            path: '/auth/register',
            element: <RegisterPage />,
          }
        ],
      },
    ],
  },

  // Protected account routes
  {
    path: '/account',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AccountLayout />,
        children: [
          {
            index: true, // For /account route
            element: <AccountPage />,
          },
          {
            path: 'posts',
            element: <PostsPage />,
          }
        ],
      },
    ],
  },

  // Protected user routes
  {
    path: '/users',
    element: <ProtectedRoute />,
    children: [
      {
        path: ':username',
        element: <UserProfilePage />,
      }
    ]
  },

  // Fallback route for 404
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}