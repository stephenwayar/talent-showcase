import { supabase } from "@/config/supabase";
import { uploadImage } from "@/helpers/functions/uploadImage";
import { CreatePostPayload } from "../types/posts.types";

export const getMyPosts = async (userId: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

export const createPost = async (payload: CreatePostPayload, userId: string) => {
  // Step 1: Upload the image
  const imageUrl = await uploadImage(payload.image, userId, 'post-images');

  // Step 2: Create the post with the image URL
  const { data, error } = await supabase
    .from('posts')
    .insert({
      title: payload.title,
      description: payload.description,
      category: payload.category,
      image_url: imageUrl,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};