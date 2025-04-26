import EmptyState from "@/components/common/EmptyState";
import LoadingState from "@/components/common/LoadingState";
import RetryButton from "@/components/common/RetryButton";
import NewPostForm from "@/components/posts/NewPostForm";
import PostCard from "@/components/posts/PostCard";
import { useAppState } from "@/hooks/useAppState";
import { createPost, getMyPosts } from "@/services/api/posts";
import { IPost } from "@/services/types/posts.types";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
      queryClient.invalidateQueries({ queryKey: ['my-posts'] }) 

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

const MyPosts = () => {
  const { user } = useAppState()

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['my-posts'],
    queryFn: () => getMyPosts(user!.id),
  })

  return (
    <div className='space-y-6'>
      <p className='font-semibold text-lg text-[#090A04]'>
        My Posts
      </p>

      {isPending && (
        <LoadingState />
      )}

      {isError && (
        <RetryButton
          failedTo="fetch posts"
          retryFn={() => refetch()}
        />
      )}

      {data && (
        data.length > 0 ? (
          <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 space-y-5 sm:space-y-0 sm:gap-5">
            {data.map((post: IPost, index: number) => (
              <PostCard
                key={index}
                data={post}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="You do not have any posts added" />
        )
      )}
    </div>
  )
}