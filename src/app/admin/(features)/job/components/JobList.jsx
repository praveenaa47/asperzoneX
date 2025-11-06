import React from 'react';

const JobList = ({ jobs, onEdit, onDelete, onStatusChange, onApprovalChange, onFeaturedToggle }) => {
  const getStatusBadge = (isActive) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const getApprovalBadge = (isApproved) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {isApproved ? 'Approved' : 'Pending'}
      </span>
    );
  };

  const getFeaturedBadge = (isFeatured) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        isFeatured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {isFeatured ? 'Featured' : 'Standard'}
      </span>
    );
  };

  const getJobTypeBadge = (jobType) => {
    const typeClasses = {
      'Full-Time': 'bg-blue-100 text-blue-800',
      'Part-Time': 'bg-purple-100 text-purple-800',
      'Contract': 'bg-orange-100 text-orange-800',
      'Internship': 'bg-green-100 text-green-800',
      'Remote': 'bg-indigo-100 text-indigo-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        typeClasses[jobType] || 'bg-gray-100 text-gray-800'
      }`}>
        {jobType}
      </span>
    );
  };

  const formatSalary = (salary) => {
    if (!salary) return 'N/A';
    
    const amount = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(salary.amount);

    const currencySymbols = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };

    return `${currencySymbols[salary.currency] || salary.currency}${amount}/${salary.period}`;
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-500">Get started by adding your first job listing</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company & Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary & Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-lg overflow-hidden">
                      {job.companyLogo ? (
                        <img
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="h-12 w-12 object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-300 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {job.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getJobTypeBadge(job.jobType)}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {truncateText(job.overview, 60)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {job.companyName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {job.location?.city}, {job.location?.state}
                  </div>
                  <div className="text-xs text-gray-400">
                    {job.jobOverview?.experience}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatSalary(job.salary)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {job.jobOverview?.education}
                  </div>
                  <div className="text-xs text-gray-400">
                    {job.jobOverview?.jobLevel}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    {getStatusBadge(job.isActive)}
                    {getApprovalBadge(job.isApproved)}
                    {getFeaturedBadge(job.isFeatured)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(job)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(job._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onFeaturedToggle(job._id, !job.isFeatured)}
                      className={`${job.isFeatured ? 'text-yellow-600' : 'text-gray-400'} hover:text-yellow-700`}
                      title={job.isFeatured ? 'Remove Featured' : 'Mark Featured'}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                    
                    {/* Status Dropdown */}
                    <select
                      value={job.isActive ? 'active' : 'inactive'}
                      onChange={(e) => onStatusChange(job._id, e.target.value === 'active')}
                      className="text-xs text-black border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>

                    {/* Approval Dropdown */}
                   {!job.isApproved ? (
  <div className="flex items-center space-x-2">
    <button
      onClick={() => onApprovalChange(job._id, true)}
      className="text-green-600 hover:text-green-800"
      title="Approve"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </button>

    <button
      onClick={() => onApprovalChange(job._id, false)}
      className="text-red-600 hover:text-red-800"
      title="Reject"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
) : (
  <span className="text-green-600 font-medium text-xs">Approved ✅</span>
)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;