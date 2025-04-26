import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import Nav from "@/components/nav/Nav";
import PostCard from "@/components/account/PostCard";
import LoadingState from "@/components/common/LoadingState";
import EmptyState from "@/components/common/EmptyState";
import RetryButton from "@/components/common/RetryButton";
import { getUserById } from "@/services/api/users";
import { getPostsByUserId } from "@/services/api/posts";

export default function UserProfilePage() {
  const { id } = useParams();

  useLayoutEffect(() => {
    document.title = "SkillLink | User Profile";
  }, []);

  // Using a single query with Promise.all for concurrent fetching
  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['userProfile', id],
    queryFn: async () => {
      const [userData, userPosts] = await Promise.all([
        getUserById(id as string),
        getPostsByUserId(id as string)
      ]);

      return { userData, userPosts };
    },
    enabled: !!id
  });

  return (
    <div>
      <Nav />

      <div className="px-4 sm:px-8 md:px-10 pb-20 pt-10">
        <div className="w-full max-w-[70rem] xl:max-w-[80rem] mx-auto">
          {isPending && <LoadingState />}

          {isError && (
            <RetryButton
              failedTo="load profile"
              retryFn={() => refetch()}
            />
          )}

          {data && (
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Profile Image */}
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {data.userData?.profilePhoto ? (
                    <img
                      src={data.userData.profilePhoto}
                      alt={data.userData.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#cc903c] flex items-center justify-center text-white text-3xl font-bold">
                      {data.userData?.fullName?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-grow text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-800">{data.userData?.fullName}</h1>
                  <p className="text-gray-500 mb-3">{data.userData?.location}</p>

                  {data.userData?.bio ? (
                    <p className="text-gray-700">{data.userData.bio}</p>
                  ) : (
                    <p className="text-gray-400 italic">No bio provided</p>
                  )}
                </div>
              </div>

              <hr className="border-neutral-400" />

              {/* User's Posts */}
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  Posts by {data.userData?.fullName}
                </h2>

                {data.userPosts && data.userPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.userPosts.map(post => (
                      <PostCard
                        showPosterLink={false}
                        key={post.id}
                        data={post}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState message="This user hasn't shared any skills yet." />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}