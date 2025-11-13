"use client";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../../components/Toast';
import { deleteUser, getAllUsers } from '@/redux/slices/userSlice';
import UserList from './components/UsersList';
import DeleteConfirmationModal from '../../components/DeleteModal';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { userList, loading, error, pagination } = useSelector((state) => state.users);
  const { addToast } = useToast();

  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    roleFilter: 'all',
    verificationFilter: 'all'
  });
  
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load users on component mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Filter users based on search and filters
  const filteredUsers = userList.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      user.phone?.includes(filters.searchTerm);

    const matchesStatus = filters.statusFilter === 'all' || 
      (filters.statusFilter === 'active' ? user.isActive : !user.isActive);
    
    const matchesRole = filters.roleFilter === 'all' || user.role === filters.roleFilter;
    
    const matchesVerification = filters.verificationFilter === 'all' || 
      (filters.verificationFilter === 'verified' ? user.isVerified : !user.isVerified);

    return matchesSearch && matchesStatus && matchesRole && matchesVerification;
  });

  const handleDeleteUser = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await dispatch(deleteUser(deleteId)).unwrap();
      setIsDeleteOpen(false);
      setDeleteId(null);
      setDeleteLoading(false);
      addToast("success", "User deleted successfully ✅");
    } catch (error) {
      console.error("Failed to delete user:", error);
      addToast("error", "Failed to delete user ❌");
      setDeleteLoading(false);
    }
  };

  

  // Show loading state
  if (loading && userList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && userList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading users: {error}</p>
          <button
            onClick={() => dispatch(getAllUsers())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage and monitor platform users</p>
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
                    placeholder="Search users by name, email, or phone..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Status Filter */}
              <select
                value={filters.statusFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Verification Filter */}
              <select
                value={filters.verificationFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, verificationFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Verification</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>
          </div>
        </div>

        {/* User List */}
        <UserList
          users={filteredUsers}
          onDelete={handleDeleteUser}
          
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
          loading={deleteLoading}
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone and will permanently remove all user data."
        />
      </div>
    </div>
  );
};

export default UserManagement;