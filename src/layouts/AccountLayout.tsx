import { Outlet } from 'react-router-dom';

export default function AccountLayout() {
  return (
    <div>
      <h1 className="text-center text-blue-700">
        AccountLayout
      </h1>

      <Outlet />
    </div>
  )
}