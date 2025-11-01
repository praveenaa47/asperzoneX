"use client";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CategoryList from './components/CategoryList';
import CategoryModal from './components/CategoryModal';
import { createCategory, deleteCategory, getMaincategory, updateCategory } from '@/redux/slices/MainCategorySlice';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { data: categories, loading, error } = useSelector((state) => state.category);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getMaincategory());
  }, [dispatch]);

  // Filter categories based on search and status
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && category.isActive) ||
                         (statusFilter === 'inactive' && !category.isActive);
    
    return matchesSearch && matchesStatus;
  });

  // Sort categories based on sortBy selection
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'status':
        return (a.isActive === b.isActive) ? 0 : a.isActive ? -1 : 1;
      default:
        return 0;
    }
  });

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (editingCategory) {
        // Update existing category
        await dispatch(updateCategory({
          id: editingCategory._id,
          reqBody: categoryData
        })).unwrap();
        toast.success('Category updated successfully');
      } else {
        // Add new category
        await dispatch(createCategory(categoryData)).unwrap();
        toast.success('Category created successfully');
      }
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      toast.error(error?.message || 'Failed to save category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
        toast.success('Category deleted successfully');
      } catch (error) {
        toast.error(error?.message || 'Failed to delete category');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const category = categories.find(cat => cat._id === id);
      if (category) {
        await dispatch(updateCategory({
          id,
          reqBody: {
            ...category,
            isActive: newStatus === 'active'
          }
        })).unwrap();
        toast.success('Category status updated successfully');
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to update category status');
    }
  };

  if (loading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total: {categories.length} categories
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>

            {/* Add Category Button */}
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Category
            </button>
          </div>
        </div>

        {/* Category List */}
        <CategoryList
          categories={sortedCategories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onStatusChange={handleStatusChange}
          loading={loading}
        />

        {/* Modal */}
        {isModalOpen && (
          <CategoryModal
            category={editingCategory}
            onSave={handleSaveCategory}
            onClose={() => {
              setIsModalOpen(false);
              setEditingCategory(null);
            }}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;