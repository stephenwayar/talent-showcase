export interface IPost {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  updated_at: string;
}

export interface CreatePostPayload {
  title: string;
  description: string;
  category: string;
  image: File;
}