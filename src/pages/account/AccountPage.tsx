import { useLayoutEffect } from "react";

export default function AccountPage() {
  useLayoutEffect(() => {
    document.title = "Account | Personal Details";
  }, []);

  return (
    <ProfileDetailsForm
      form={form}
      mutation={mutation}
      handleSubmit={handleSubmit}
    />
  )
}