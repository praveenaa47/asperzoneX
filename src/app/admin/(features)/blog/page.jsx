"use client";
import { addBlog, deleteBlog, getBlogs, updateBlog } from "@/redux/slices/blogSlice";
import { getMaincategory } from "@/redux/slices/MainCategorySlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./components/BlogList";
import BlogModal from "./components/BlogModal";

const BlogManagement = () => {
  const dispatch = useDispatch();
  const { data: blogs, loading, error } = useSelector((state) => state.blogs);
  const { data: categories } = useSelector((state) => state.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    categoryFilter: 'all'
  });

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getMaincategory());
  }, [dispatch]);

  // Filter blogs based on search and filters
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         blog.subtitle?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         blog.tags?.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    const matchesStatus = filters.statusFilter === 'all' || 
                         (blog.isPublished ? 'published' : 'draft') === filters.statusFilter;
    const matchesCategory = filters.categoryFilter === 'all' || 
                           blog.category?._id === filters.categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleAddBlog = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleSaveBlog = async (blogData) => {
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('title', blogData.title);
      formData.append('subtitle', blogData.subtitle);
      formData.append('category', blogData.category);
      formData.append('author[name]', blogData.author.name);
      formData.append('introduction', blogData.introduction);
      formData.append('tags', blogData.tags);
      formData.append('readTime', blogData.readTime);
      formData.append('isPublished', blogData.isPublished.toString());
      formData.append('isFeatured', blogData.isFeatured.toString());

      // Append cover image
      if (blogData.coverImage instanceof File) {
        formData.append('coverImage', blogData.coverImage);
      } else if (typeof blogData.coverImage === 'string' && blogData.coverImage) {
        formData.append('coverImage', blogData.coverImage);
      }

      // Append sections with icons
      blogData.sections?.forEach((section, index) => {
        formData.append(`sections[${index}][title]`, section.title);
        formData.append(`sections[${index}][content]`, section.content);
        
        if (section.icon instanceof File) {
          formData.append(`sections[${index}][icon]`, section.icon);
        } else if (typeof section.icon === 'string' && section.icon) {
          formData.append(`sections[${index}][icon]`, section.icon);
        }
      });

      // Debug: Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? `File: ${value.name}` : value);
      }

      if (editingBlog) {
        await dispatch(updateBlog({
          id: editingBlog._id,
          formData
        })).unwrap();
      } else {
        await dispatch(addBlog(formData)).unwrap();
      }
      
      setIsModalOpen(false);
      setEditingBlog(null);
    } catch (error) {
      console.error('Failed to save blog:', error);
      alert('Failed to save blog. Please try again.');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await dispatch(deleteBlog(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete blog:', error);
        alert('Failed to delete blog. Please try again.');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append('isPublished', newStatus.toString());
      
      await dispatch(updateBlog({
        id,
        formData
      })).unwrap();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const handleFeaturedToggle = async (id) => {
    try {
      const blog = blogs.find(b => b._id === id);
      if (blog) {
        const formData = new FormData();
        formData.append('isFeatured', (!blog.isFeatured).toString());
        
        await dispatch(updateBlog({
          id,
          formData
        })).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      alert('Failed to update featured status. Please try again.');
    }
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Manage your blog posts and content</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Filters */}
              <select
                value={filters.statusFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                className="text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={filters.categoryFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, categoryFilter: e.target.value }))}
                className="text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Blog Button */}
            <button
              onClick={handleAddBlog}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {loading ? 'Loading...' : 'Add New Blog'}
            </button>
          </div>
        </div>

        {/* Blog List */}
        <BlogList
          blogs={filteredBlogs}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
          loading={loading}
        />

        {/* Modal */}
        {isModalOpen && (
          <BlogModal
            blog={editingBlog}
            categories={categories}
            onSave={handleSaveBlog}
            onClose={() => {
              setIsModalOpen(false);
              setEditingBlog(null);
            }}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default BlogManagement;