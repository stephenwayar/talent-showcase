import { useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Nav from "@/components/nav/Nav";
import PostCard from "@/components/posts/PostCard";
import EmptyState from "@/components/common/EmptyState";
import LoadingState from "@/components/common/LoadingState";
import RetryButton from "@/components/common/RetryButton";
import { useAppState } from "@/hooks/useAppState";
import { getAllPosts } from "@/services/api/posts";
import { IPost } from "@/services/types/posts.types";
import heroImage from "@/assets/svgs/hero-image.svg";

export default function LandingPage() {
  const { user } = useAppState();

  useLayoutEffect(() => {
    document.title = "SkillLink | Connect & Showcase Your Talents";
  }, []);

  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPosts(),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#cc903cdf] to-[#cc903c] text-white">
        <div className="px-4 sm:px-8 md:px-10">
          <div className="w-full max-w-[70rem] xl:max-w-[80rem] mx-auto py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center md:space-x-10 justify-between">
              <div className="lg:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Discover and Showcase Your Skills
                </h1>

                <p className="text-lg lg:text-xl mb-8 opacity-90">
                  Connect with talented individuals, share your expertise, and build your professional network.
                </p>

                {!user ? (
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/auth/register"
                      className="bg-white text-[#cc903c] px-8 py-2 rounded-full font-semibold hover:shadow-md transition duration-200"
                    >
                      Join Now
                    </Link>
                    <Link
                      to="/auth/login"
                      className="bg-transparent border-2 border-white hover:bg-white hover:shadow-md hover:text-[#cc903c] px-8 py-2 rounded-full font-semibold transition duration-200"
                    >
                      Log in
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/account/posts"
                    className="bg-white text-[#cc903c] px-8 py-2 rounded-full hover:shadow-md font-semibold transition duration-200"
                  >
                    Share Your Skills
                  </Link>
                )}
              </div>

              <div className="hidden lg:block">
                <img
                  src={heroImage}
                  alt="Skill sharing"
                  className="rounded-lg shadow-lg max-w-full h-auto max-h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="flex-grow bg-white px-4 sm:px-8 md:px-10 py-12">
        <div className="w-full max-w-[70rem] xl:max-w-[80rem] mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore Skills</h2>

          {isPending && <LoadingState />}

          {isError && (
            <RetryButton
              failedTo="fetch posts"
              retryFn={() => refetch()}
            />
          )}

          {data && (
            data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((post: IPost, index: number) => (
                  <PostCard
                    key={post.id || index}
                    data={post}
                  />
                ))}
              </div>
            ) : (
              <EmptyState message="Be the first to showcase your skills! Join SkillLink and start sharing today." />
            )
          )}
        </div>
      </div>
    </div>
  );
}