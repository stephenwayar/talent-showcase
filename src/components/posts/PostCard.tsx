import { useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from '@/assets/imgs/placeholder.jpg';
import { IPost } from "@/services/types/posts.types";

interface Props {
  data: IPost;
}

export default function PostCard({ data }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="shadow-md rounded-b-md overflow-hidden">
      <div className="w-full h-48 overflow-hidden relative">
        <div
          className={`w-full h-full bg-gray-200 absolute top-0 left-0 flex items-center justify-center ${imageLoaded && !imageError ? 'hidden' : 'block'
            }`}
        >
          <span className="text-gray-400">
            {imageError ? 'Image not available' : 'Loading...'}
          </span>
        </div>

        <img
          src={data.image_url || defaultImage}
          alt={data.title}
          className={`w-full h-full object-cover object-center transition duration-[200ms] delay-75 hover:brightness-50 hover:scale-125 ${imageLoaded && !imageError ? 'block' : 'hidden'
            }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className="p-3 bg-white">
        <h3 className="text-lg wrap-break-word font-semibold text-[#1D1D1B]">
          {data.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 my-1">
          {data.description}
        </p>

        <div className="flex items-center mt-1">
          <span className="text-[#cc903c] text-xs bg-[#cc903c]/10 px-2 py-1 rounded-full flex items-center">
            <span className="mr-1">#</span>
            {data.category.toLowerCase().replace(/\s+/g, '-')}
          </span>
        </div>

        <Link
          to={`/users/${data.user_id}`}
          className="hover:underline font-semibold text-[#1D1D1B] inline-block mt-2"
        >
          View author
        </Link>
      </div>
    </div>
  );
}