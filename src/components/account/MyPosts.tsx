import { IPost } from "@/services/types/posts.types"
import EmptyState from "../common/EmptyState"
import PostCard from "./PostCard"
import RetryButton from "../common/RetryButton"
import LoadingState from "../common/LoadingState"
import { useAppState } from "@/hooks/useAppState"
import { useQuery } from "@tanstack/react-query"
import { getPostsByUserId } from "@/services/api/posts"

const MyPosts = () => {
  const { user } = useAppState()

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['posts', user!.id],
    queryFn: () => getPostsByUserId(user!.id),
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

export default MyPosts