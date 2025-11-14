"use client";
import React, { useEffect } from "react";
import { Clock } from "lucide-react";
import { getBlogs } from "@/redux/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Blogsdetails() {
  const dispatch = useDispatch();
  const { data: blogs, loading, error } = useSelector((state) => state.blogs);
  const router = useRouter();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <div className="w-full  px-4 py-12">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
        Aspire Insights
      </h1>

      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
      )}
      {error && (
        <p className="text-center text-red-600 text-lg">Failed to load blogs</p>
      )}

      {/* Articles List */}
      <div className="space-y-6">
        {blogs?.map((article) => (
          <div
            key={article._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full md:w-40 h-40 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mb-4">
                    {article.subtitle || article.introduction}{" "}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime || "5 min"}</span>{" "}
                    </div>
                    <span>•</span>
                    <span>
                      {new Date(article.publishDate).toLocaleDateString(
                        "en-IN"
                      )}
                    </span>{" "}
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="flex items-center md:items-start">
                <button 
                            onClick={()=>router.push(`/blog-details/${article._id}`)}

                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
