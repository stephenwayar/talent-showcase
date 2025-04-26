import { supabase } from '@/config/supabase';

/**
 * Uploads an image to Supabase storage and returns the public URL
 * @param file The image file to upload
 * @param userId The user ID to use as the folder name
 * @param bucketName The storage bucket name ('profile-photos' or 'post-images')
 * @returns The public URL of the uploaded image
 */

export const uploadImage = async (
  file: File,
  userId: string,
  bucketName: 'profile-photos' | 'post-images'
): Promise<string> => {
  // Create a unique file name with timestamp to avoid collisions
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Upload the file to the specified bucket
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw uploadError;
  }

  // Get the public URL of the uploaded file
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return data.publicUrl;
};