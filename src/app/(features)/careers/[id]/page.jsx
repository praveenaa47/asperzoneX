"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, getCategoryBlogs } from "@/redux/slices/blogSlice";
import Categories from "./components/CategoriesComponents";
import BlogPostCard from "./components/BlogCard";
import RecentPosts from "./components/RecentPosts";
import ConversationAndCV from "./components/Cv";
import Header from "@/components/home/Header";
import AspireZonesFooter from "@/components/Footer";
import CareersBanner from "./components/CareersBanner";
import JobListings from "./components/JobCards";
import { useParams } from "next/navigation";

export default function BlogPostSection() {
  const dispatch = useDispatch();
  const { id: categoryId } = useParams(); // dynamic route /blogs/[id]
  const { data: blogs, loading, error } = useSelector((state) => state.blogs);

  const [formData, setFormData] = useState({
    name: "",
    joinName: "",
    email: "",
    address: "",
    university: "",
    universityType: "",
    phone: "",
    commentEmail: "",
    comment: "",
  });

  // ✅ Fetch blogs on mount or when category changes
  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryBlogs(categoryId));
    } else {
      dispatch(getBlogs());
    }
  }, [dispatch, categoryId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const handleCVUpload = () => {
    console.log("CV upload triggered");
  };

  const handleShowMoreCategories = () => {
    console.log("Show more categories");
  };

  const categories = [
    { name: "AI in Recruitment", color: "text-blue-600" },
    { name: "Remote Work", color: "text-blue-600" },
    { name: "AI in Medicine", color: "text-blue-600" },
    { name: "Diversity & Inclusion", color: "text-blue-600" },
    { name: "Future Of Work", color: "text-blue-600" },
    { name: "Talent Strategy", color: "text-blue-600" },
  ];

  const recentPosts = [
    { title: "AI and the talent landscape", date: "24" },
    { title: "The Rise of Gig Economy Hiring", date: "23" },
    { title: "Revolutionizing Recruitment", date: "24" },
    { title: "Revolutionizing Recruitment", date: "24" },
  ];

  return (
    <>
      <Header />
      <CareersBanner />
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <JobListings />

              {loading && (
                <p className="text-center text-gray-500">Loading blogs...</p>
              )}
              {error && <p className="text-center text-red-500">{error}</p>}

              {!loading && blogs?.length === 0 && (
                <p className="text-center text-gray-500">No blogs found.</p>
              )}

              {blogs?.map((post) => (
                <BlogPostCard
                  key={post._id}
                  id={post._id}
                  image={post.coverImage}
                  title={post.title}
                  author={post.author?.name}
                  date={new Date(post.publishDate).toDateString()}
                  description={post.subtitle}
                  keyTopics={post.tags?.join(", ")}
                />
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* <Categories
                categories={categories}
                onShowMore={handleShowMoreCategories}
              /> */}
              {/* <RecentPosts posts={recentPosts} /> */}
              <ConversationAndCV
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onCVUpload={handleCVUpload}
              />
            </div>
          </div>
        </div>
      </div>
      <AspireZonesFooter />
    </>
  );
}
