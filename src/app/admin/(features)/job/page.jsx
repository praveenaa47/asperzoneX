"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobList from "./components/JobList";
import JobModal from "./components/JobModal";
import DeleteConfirmationModal from "../../components/DeleteModal";
import { useToast } from "../../components/Toast";
import { addJob, deleteJob, getJobs, updateJob } from "@/redux/slices/jobSlice";

const JobManagement = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    jobTypeFilter: 'all',
    approvalFilter: 'all',
    statusFilter: 'all'
  });

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.overview?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesJobType = filters.jobTypeFilter === 'all' || job.jobType === filters.jobTypeFilter;
    const matchesApproval = filters.approvalFilter === 'all' || 
      (filters.approvalFilter === 'approved' ? job.isApproved : !job.isApproved);
    const matchesStatus = filters.statusFilter === 'all' || job.isActive === (filters.statusFilter === 'active');

    return matchesSearch && matchesJobType && matchesApproval && matchesStatus;
  });

  const handleAddJob = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleSaveJob = async (jobData) => {
  try {
    const formData = new FormData();

    // Append basic fields
    formData.append('title', jobData.title);
    formData.append('companyName', jobData.companyName);
    formData.append('jobType', jobData.jobType);
    formData.append('overview', jobData.overview);

    // Append salary object as JSON string
    formData.append('salary', JSON.stringify(jobData.salary));

    // Append location object as JSON string
    formData.append('location', JSON.stringify(jobData.location));

    // Append jobOverview object as JSON string
    formData.append('jobOverview', JSON.stringify(jobData.jobOverview));

    // Append array fields as JSON strings
    formData.append('keyResponsibilities', JSON.stringify(jobData.keyResponsibilities));
    formData.append('qualifications', JSON.stringify(jobData.qualifications));
    formData.append('whyJoinUs', JSON.stringify(jobData.whyJoinUs));

    // Append company logo
    if (jobData.companyLogo instanceof File) {
      formData.append('companyLogo', jobData.companyLogo);
    }

    // Append status fields
    formData.append('isActive', jobData.isActive.toString());
    formData.append('isFeatured', jobData.isFeatured.toString());
    formData.append('isApproved', jobData.isApproved.toString());
    
    if (editingJob) {
      await dispatch(updateJob({ id: editingJob._id, formData })).unwrap();
      addToast("success", "Job updated successfully ✅");
    } else {
      await dispatch(addJob(formData)).unwrap();
      addToast("success", "Job added successfully ✅");
    }

    setIsModalOpen(false);
    setEditingJob(null);
  } catch (error) {
    console.error('Failed to save job:', error);
    addToast("error", "Failed to save job ❌");
  }
};

  const handleDeleteJob = (id) => {
    setJobToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;

    try {
      setDeleteLoading(true);
      await dispatch(deleteJob(jobToDelete)).unwrap();
      setIsDeleteModalOpen(false);
      setJobToDelete(null);
      addToast("success", "Job deleted successfully ✅");
    } catch (error) {
      console.error("Delete failed:", error);
      addToast("error", "Failed to delete job ❌");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (id, isActive) => {
    try {
      const formData = new FormData();
      formData.append('isActive', isActive.toString());

      await dispatch(updateJob({ id, formData })).unwrap();
      addToast("success", "Job status updated successfully ✅");
    } catch (error) {
      console.error('Failed to update status:', error);
      addToast("error", "Failed to update job status ❌");
    }
  };

  const handleApprovalChange = async (id, isApproved) => {
    try {
      const formData = new FormData();
      formData.append('isApproved', isApproved.toString());

      await dispatch(updateJob({ id, formData })).unwrap();
      addToast("success", "Job approval status updated successfully ✅");
    } catch (error) {
      console.error('Failed to update approval:', error);
      addToast("error", "Failed to update job approval status ❌");
    }
  };

  const handleFeaturedToggle = async (id, isFeatured) => {
    try {
      const formData = new FormData();
      formData.append('isFeatured', isFeatured.toString());

      await dispatch(updateJob({ id, formData })).unwrap();
      addToast("success", "Job featured status updated successfully ✅");
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      addToast("error", "Failed to update job featured status ❌");
    }
  };

  const jobTypes = [
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Remote', label: 'Remote' }
  ];

  const educationLevels = [
    { value: 'High School', label: 'High School' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Graduation', label: 'Graduation' },
    { value: 'Post Graduation', label: 'Post Graduation' },
    { value: 'PhD', label: 'PhD' }
  ];

  const jobLevels = [
    { value: 'Entry Level', label: 'Entry Level' },
    { value: 'Mid Level', label: 'Mid Level' },
    { value: 'Senior Level', label: 'Senior Level' },
    { value: 'Executive', label: 'Executive' }
  ];

  const experienceLevels = [
    { value: '0-1 year', label: '0-1 year' },
    { value: '1-3 years', label: '1-3 years' },
    { value: '3-5 years', label: '3-5 years' },
    { value: '5-8 years', label: '5-8 years' },
    { value: '8+ years', label: '8+ years' }
  ];

  const currencies = [
    { value: 'INR', label: 'Indian Rupee (₹)' },
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' }
  ];

  const salaryPeriods = [
    { value: 'Hour', label: 'Per Hour' },
    { value: 'Day', label: 'Per Day' },
    { value: 'Month', label: 'Per Month' },
    { value: 'Year', label: 'Per Year' }
  ];

  // Show loading state
  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading jobs: {error}</p>
          <button
            onClick={() => dispatch(getJobs())}
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
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600">Manage job listings and applications</p>
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
                    placeholder="Search jobs..."
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
                value={filters.jobTypeFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, jobTypeFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {jobTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={filters.approvalFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, approvalFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Approval</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </select>

              <select
                value={filters.statusFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Add Job Button */}
            <button
              onClick={handleAddJob}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Job
            </button>
          </div>
        </div>

        {/* Job List */}
        <JobList
          jobs={filteredJobs}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
          onStatusChange={handleStatusChange}
          onApprovalChange={handleApprovalChange}
          onFeaturedToggle={handleFeaturedToggle}
        />

        {/* Modal */}
        {isModalOpen && (
          <JobModal
            job={editingJob}
            jobTypes={jobTypes}
            educationLevels={educationLevels}
            jobLevels={jobLevels}
            experienceLevels={experienceLevels}
            currencies={currencies}
            salaryPeriods={salaryPeriods}
            onSave={handleSaveJob}
            onClose={() => {
              setIsModalOpen(false);
              setEditingJob(null);
            }}
          />
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setJobToDelete(null);
          }}
          onConfirm={confirmDelete}
          loading={deleteLoading}
          title="Delete Job"
          message="Are you sure you want to delete this job? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default JobManagement;