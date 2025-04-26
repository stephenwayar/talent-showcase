import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { toast } from "react-hot-toast";
import { useAppState } from "@/hooks/useAppState";
import { updateProfileDetails } from "@/services/api/users";
import ProfileDetailsForm from "@/components/account/ProfileDetailsForm";
import { UpdateProfileData } from "@/services/types/users.types";
import { IUser } from "@/services/types/auth.types";
import { setCookieItem } from "@/helpers/functions/cookie";

export interface InitialValuesType {
  fullName: string;
  location: string;
  email: string;
  bio: string;
}

export default function AccountPage() {
  const { user, setUser } = useAppState();

  useLayoutEffect(() => {
    document.title = "Account | Personal Details";
  }, []);

  const form = useForm<InitialValuesType>({
    initialValues: {
      fullName: user?.fullName ?? '',
      location: user?.location ?? '',
      email: user?.email ?? '',
      bio: user?.bio ?? '',
    },
    validate: {
      fullName: (value) => (
        !value ? 'Full name is required' : null
      ),
      location: (value) => (
        !value ? 'Location is required' : null
      )
    },
  });

  const mutation = useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfileDetails(data, user!.id),
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to update profile details');
    },
    onSuccess: async () => {
      const updatedUser: IUser = {
        id: user!.id,
        email: user!.email,
        accessToken: user!.accessToken,
        fullName: form.values.fullName,
        location: form.values.location,
        bio: form.values.bio,
        profilePhoto: user!.profilePhoto
      };

      // Update user details in cookies and state
      setUser(updatedUser);
      setCookieItem('session-user', updatedUser);

      toast.success('Profile details updated');
      form.resetDirty();
    },
  });

  const handleSubmit = (values: InitialValuesType) => {
    const payload: UpdateProfileData = {
      fullName: values.fullName,
      location: values.location,
      bio: values.bio
    };

    mutation.mutate(payload);
  };

  return (
    <ProfileDetailsForm
      form={form}
      mutation={mutation}
      handleSubmit={handleSubmit}
    />
  );
}