import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div>
      <h1 className="text-center text-blue-700">
        AuthLayout
      </h1>

      <Outlet />
    </div>
  )
}