"use client";
import { useEffect, useState } from "react";
import { Heart, Share2, MessageSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryBlogs } from "@/redux/slices/blogSlice";
import { useParams, useRouter } from "next/navigation";

export default function BusinessIdeasSection() {
  const [favorites, setFavorites] = useState({});
const dispatch = useDispatch();
const {id} = useParams();
const{data, loading, error}=useSelector((state)=>state.blogs);
const router = useRouter();

useEffect(()=>{
  dispatch(getCategoryBlogs(id));
},[dispatch, id])

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEnquiry = (title) => alert(`Enquiry sent for: ${title}`);
  const handleShare = (title) => alert(`Sharing: ${title}`);

   if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-lg">Loading Ideas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-lg">No idea listings found.</p>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-16 lg:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-6 md:mb-14">
          Business Ideas
        </h2>

        {/* Unified Responsive Layout */}
        <div
          className="
            flex md:grid gap-4 md:gap-8 
            overflow-x-auto md:overflow-visible 
            md:grid-cols-2
            pb-4 md:pb-0 
            -mx-4 px-4 md:mx-0 md:px-0
          "
        >
          {data.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex-shrink-0 w-72 md:w-auto flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                {/* Top Section */}
                <div>
                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <span>By {blog.author?.name}</span>
                      <span className="mx-2">•</span>
 <span>{new Date(blog.publishDate).toDateString()}</span>                    </div>
                    <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                      {blog.category?.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                    {blog.subtitle}
                  </p>
                </div>

                {/* Bottom Buttons */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mt-auto">
                  {/* Enquiry */}
                  <button
                  onClick={()=>router.push(`/blog-details/${blog._id}`)}
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Enquiry Now
                  </button>

                  <div className="flex gap-2 w-full md:w-auto">
                    {/* Favorite */}
                    <button
                      onClick={() => toggleFavorite(blog.id)}
                      className={`flex items-center justify-center gap-2 flex-1 md:flex-none px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        favorites[blog.id]
                          ? "border-red-500 text-red-500 bg-red-50"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites[blog.id] ? "fill-current" : ""
                        }`}
                      />
                      Favorite
                    </button>

                    {/* Share */}
                    <button
                      onClick={() => handleShare(blog.title)}
                      className="flex items-center justify-center gap-2 flex-1 md:flex-none px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-gray-400 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10">
          <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}
