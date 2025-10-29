"use client";
import { useState } from 'react';
import CategoryList from './components/CategoryList';
import CategoryModal from './components/CategoryModal';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Student Hostels",
      description: "Accommodation specifically designed for students with study-friendly environments",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=150",
      status: "active",
      createdAt: "2024-01-15",
      totalProperties: 24
    },
    {
      id: 2,
      name: "Apartments",
      description: "Self-contained residential units with private facilities",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150",
      status: "active",
      createdAt: "2024-01-14",
      totalProperties: 18
    },
    {
      id: 3,
      name: "Guest Houses",
      description: "Small, privately-owned accommodations with personalized service",
      image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=150",
      status: "inactive",
      createdAt: "2024-01-10",
      totalProperties: 12
    },
    {
      id: 4,
      name: "Dormitories",
      description: "Shared living spaces with multiple residents in one room",
      image: "https://images.unsplash.com/photo-1555854871-d4b0c2c7bf32?w=150",
      status: "active",
      createdAt: "2024-01-16",
      totalProperties: 32
    },
    {
      id: 5,
      name: "Private Rooms",
      description: "Individual rooms within shared houses or apartments",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=150",
      status: "active",
      createdAt: "2024-01-13",
      totalProperties: 45
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter categories based on search and status
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      // Update existing category
      setCategories(prev =>
        prev.map(cat =>
          cat.id === editingCategory.id
            ? { ...cat, ...categoryData, id: editingCategory.id }
            : cat
        )
      );
    } else {
      // Add new category
      const newCategory = {
        ...categoryData,
        id: Math.max(...categories.map(c => c.id)) + 1,
        createdAt: new Date().toISOString().split('T')[0],
        totalProperties: 0
      };
      setCategories(prev => [...prev, newCategory]);
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(category => category.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id ? { ...category, status: newStatus } : category
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-600">Manage property categories and types</p>
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
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
          categories={filteredCategories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onStatusChange={handleStatusChange}
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
          />
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;