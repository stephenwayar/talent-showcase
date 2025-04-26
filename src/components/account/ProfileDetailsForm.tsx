import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { UseFormReturnType } from '@mantine/form';
import { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAppState } from '@/hooks/useAppState';
import { updateProfilePicture } from '@/services/api/users';
import Input from '../custom/Input';
import { InitialValuesType } from '@/pages/account/AccountPage';
import { UpdateProfileData } from '@/services/types/users.types';
import { IUser } from '@/services/types/auth.types';
import { setCookieItem } from '@/helpers/functions/cookie';

interface Props {
  form: UseFormReturnType<InitialValuesType, (values: InitialValuesType) => InitialValuesType>;
  mutation: UseMutationResult<any, any, UpdateProfileData, unknown>;
  handleSubmit: (values: InitialValuesType) => void;
}

export default function ProfileDetailsForm({
  form,
  mutation,
  handleSubmit,
}: Props) {
  const { user, setUser } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      // Create preview first
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);

      // Start upload
      setUploading(true);

      // Call separate service to handle both upload and profile update
      const { imageUrl } = await updateProfilePicture(file, user?.id);

      // Update the user state with the new profile image
      const updatedUser: IUser = {
        ...user as IUser,
        profilePhoto: imageUrl
      };

      // Update user in state and cookies
      setUser(updatedUser);
      setCookieItem('session-user', updatedUser);

      toast.success('Profile photo updated');
    } catch (_error) {
      toast.error('Failed to update profile photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <div>
        <div className="relative mx-auto w-[135px] h-[135px] lg:h-[200px] lg:w-[200px]">
          <div
            onClick={handlePhotoClick}
            className="w-full h-full rounded-full hover:brightness-50 transition duration-75 ease-in overflow-hidden cursor-pointer"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="profile preview"
                className="object-cover w-full h-full"
              />
            ) : user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-[#cc903c] hover:brightness-50 transition duration-75 ease-in flex items-center justify-center text-white">
                <span className="text-3xl font-bold">
                  {user?.fullName ? user.fullName.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleProfilePhotoChange}
            disabled={uploading}
          />
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <Input
              {...form.getInputProps('fullName')}
              type="text"
              label="Full name"
              placeholder="John Doe"
              disabled={mutation.isPending}
              className={`w-full ${form.errors.fullName ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
            />
          </div>

          <div>
            <Input
              {...form.getInputProps('email')}
              type="email"
              label="Email"
              placeholder="john@example.com"
              readOnly
              disabled={true}
              className="w-full border-[#D0D5DD] focus:outline-none border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]"
            />
          </div>

          <div>
            <Input
              {...form.getInputProps('location')}
              type="text"
              label="Location"
              placeholder="City, Country"
              disabled={mutation.isPending}
              className={`w-full ${form.errors.location ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
            />
          </div>

          <div>
            <label className="text-sm text-[#090A04] block mb-1">
              Bio
            </label>

            <textarea
              {...form.getInputProps('bio')}
              placeholder="Tell us about yourself..."
              disabled={mutation.isPending}
              rows={4}
              className="w-full border-[#D0D5DD] min-h-20 h-32 max-h-40 focus:outline-[#090A04] border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]"
            />
          </div>
        </div>

        <div className="mt-10">
          <button
            disabled={mutation.isPending || !form.isDirty()}
            type="submit"
            className="w-full disabled:cursor-not-allowed disabled:opacity-50 h-[3.5rem] text-white text-center rounded-md font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]"
          >
            {mutation.isPending ? (
              <Icon
                className="animate-spin mx-auto"
                icon="icomoon-free:spinner2"
                color="white"
                width="20"
                height="20"
              />
            ) : (
              'Update profile'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}