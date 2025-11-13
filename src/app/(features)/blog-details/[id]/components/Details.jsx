"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getSingleBlog } from "@/redux/slices/blogSlice";
import { Calendar, User } from "lucide-react";

export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBlog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id));
    }
  }, [id, dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading blog...
      </div>
    );

  if (error)
    return (
    <div className="flex justify-center items-center min-h-screen text-red-600 text-center px-4">
  Failed to load blog: {error?.message || String(error)}
</div>

    );

  if (!singleBlog)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        No blog found.
      </div>
    );

  // ✅ Now singleBlog is the actual blog object
  const {
    title,
    subtitle,
    author,
    coverImage,
    introduction,
    sections,
    publishDate,
    readTime,
  } = singleBlog;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 text-center px-2">
            {title}
          </h1>
          
          <p className="text-center text-xs sm:text-sm lg:text-base text-gray-500 mb-6 sm:mb-8 font-medium flex justify-center gap-3">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {author?.name || "Unknown"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />{" "}
              {new Date(publishDate).toLocaleDateString("en-GB")}
            </span>
            {readTime && <span>{readTime}</span>}
          </p>

          {coverImage && (
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed px-2">
            {introduction}
          </p>
        </div>
      </div>

      {/* Sections (Dynamic with Icon Images) */}
      {sections && sections.length > 0 && (
        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-200 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {section.icon && (
                      <div className="flex-shrink-0 w-15 h-15 sm:w-12 sm:h-12  rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={section.icon}
                          alt={section.title}
                          className="lg:w-15 lg:h-15 sm:w-8 sm:h-8 object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                        {section.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            
          </div>
        </div>
      )}
    </div>
  );
}
