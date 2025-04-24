import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

export default function AppRouter() {
  return <RouterProvider router={router} />;
}