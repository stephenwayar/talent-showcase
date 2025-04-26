import { useLayoutEffect } from "react";

export default function AccountPage() {
  useLayoutEffect(() => {
    document.title = "Account | Personal Details";
  }, []);

  return (
    <div>
      <h1 className="text-center text-blue-700">
        AccountPage
      </h1>
    </div>
  )
}