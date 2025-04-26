import { supabase } from "@/config/supabase";
import { uploadImage } from "@/helpers/functions/uploadImage";
import { UpdateProfileData } from "../types/users.types";

export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateProfileDetails = async (data: UpdateProfileData, userId: string) => {
  const { error } = await supabase
    .from('accounts')
    .update({
      fullName: data.fullName,
      location: data.location,
      bio: data.bio,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  return { success: true}
};

export const updateProfilePicture = async (file: File, userId: string) => {
  // Step 1: Upload the image
  const imageUrl = await uploadImage(file, userId, 'profile-photos');

  // Step 2: Update the user profile with the new image URL
  const { error } = await supabase
    .from('accounts')
    .update({
      profilePhoto: imageUrl,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  return { success: true, imageUrl };
};