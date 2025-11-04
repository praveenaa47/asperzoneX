"use client";
import { getBlogs } from "@/redux/slices/blogSlice";
import { ArrowRight, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LatestBlogs() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(getBlogs(id));
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-center py-10">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <div className="px-10">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Latest Blog Posts
      </h2>

      {/* Mobile: Horizontal scroll, Desktop: Grid */}
      <div className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-8 flex md:flex-none overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex-shrink-0 w-[280px] md:w-auto overflow-hidden hover:shadow-xl duration-300 snap-start"
            >
              <div className="relative">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded">
                  {new Date(blog.publishDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-black line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {blog.introduction}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <a
                    href={`/blogs/${blog._id}`}
                    className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blogs found for this category.
          </p>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}