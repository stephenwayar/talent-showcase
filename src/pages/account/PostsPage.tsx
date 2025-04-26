import MyPosts from "@/components/account/MyPosts";
import NewPostForm from "@/components/account/NewPostForm";
import { useAppState } from "@/hooks/useAppState";
import { createPost } from "@/services/api/posts";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import toast from "react-hot-toast";

export interface InitialValuesType {
  title: string;
  description: string;
  category: string;
  image: File | null;
}

export default function PostsPage() {
  const { user } = useAppState()
  const queryClient = useQueryClient()

  useLayoutEffect(() => {
    document.title = "Account | Posts";
  }, []);

  const form = useForm<InitialValuesType>({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: null
    },

    validate: {
      title: (value) => {
        if (!value) {
          return 'Title is required';
        }
        if (value.length > 20) {
          return 'Title must be 20 characters or less';
        }
        return null;
      },
      description: (value) => {
        if (!value) {
          return 'Description is required';
        }
        if (value.length > 50) {
          return 'Description must be 50 characters or less';
        }
        return null;
      },
      category: (value) => {
        if (!value) {
          return 'Category is required';
        }
        if (value.length > 20) {
          return 'Category must be 20 characters or less';
        }
        return null;
      },
      image: (value) => {
        if (!value) {
          return 'An image is required for your post';
        }

        // Validate file size (max 5MB)
        if (value && value.size > 5 * 1024 * 1024) {
          return 'Image must be less than 5MB';
        }

        return null;
      }
    },
  });

  const mutation = useMutation({
    mutationFn: () => createPost({
      title: form.values.title,
      description: form.values.description,
      category: form.values.category,
      image: form.values.image as File,
    }, user!.id),
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to create post')
    },
    onSuccess: () => {
      // invalidate to fetch new data
      queryClient.invalidateQueries({ queryKey: ['posts', user!.id] })

      form.reset()
      toast.success('Post created')
    },
  })

  return (
    <div className="space-y-14">
      <NewPostForm
        form={form}
        mutation={mutation}
      />

      <MyPosts />
    </div>
  )
}