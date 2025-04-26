import AuthRoute from './auth';
import ProtectedRoute from './protected';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/auth/LoginPage';
import LandingPage from '@/pages/home/LandingPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import AccountLayout from '@/layouts/AccountLayout';
import AccountPage from '@/pages/account/AccountPage';
import PostsPage from '@/pages/account/PostsPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import { createBrowserRouter } from 'react-router-dom';
import UserProfilePage from '@/pages/users/UserProfilePage';

export const router = createBrowserRouter([
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