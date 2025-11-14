import React from 'react';

const EnquiryList = ({ enquiries, onView, onDelete, onStatusUpdate }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      contacted: { color: 'bg-blue-100 text-blue-800', label: 'Contacted' },
      responded: { color: 'bg-green-100 text-green-800', label: 'Responded' },
      closed: { color: 'bg-gray-100 text-gray-800', label: 'Closed' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEnquiryType = (enquiry) => {
    if (enquiry.category?.name === 'Travel & Holidays') {
      if (enquiry.tourType) return 'Tour Package';
      if (enquiry.flightType === 'roundtrip') return 'Roundtrip Flight';
      if (enquiry.flightType === 'oneway') return 'One-way Flight';
      if (enquiry.flightType === 'multicity') return 'Multi-city Flight';
      if (enquiry.hotelName) return 'Hotel Booking';
      if (enquiry.packageSelection) return 'Travel Package';
      return 'Travel Enquiry';
    }
    if (enquiry.category?.name === 'Real Estate') return 'Real Estate';
    if (enquiry.category?.name === 'Higher education') return 'Education';
    if (enquiry.category?.name === 'Finance and business') return 'Finance';
    if (enquiry.category?.name === 'Talent & Careers') return 'Career';
    if (enquiry.category?.name === 'Inovaate') return 'Innovation';
    
    return enquiry.category?.name || 'General Enquiry';
  };

 const getLocationInfo = (enquiry) => {
  // If direct `location` exists (Car enquiries, simple forms)
  if (enquiry.location) {
    return enquiry.location;
  }

  // Travel enquiries (destination-based)
  if (enquiry.destination) {
    return enquiry.destination;
  }

  if (enquiry.hotel_location) {
    return enquiry.hotel_location;
  }

  // Student enquiry
  if (enquiry.student_location) {
    return enquiry.student_location;
  }

  // Innovate enquiry
  if (enquiry.innovate_location) {
    return enquiry.innovate_location;
  }

  // Flight enquiry (oneway / roundtrip)
  if (enquiry.from && enquiry.to) {
    return `${enquiry.from} → ${enquiry.to}`;
  }

  // Multi-city flights
  if (enquiry.multiCityRoutes?.length > 0) {
    return enquiry.multiCityRoutes.map(r => `${r.from} → ${r.to}`).join(", ");
  }

  return "Not specified";
};


  const getEnquiryDetails = (enquiry) => {
    const details = [];
    
    if (enquiry.tourType) details.push(`Tour: ${enquiry.tourType}`);
    if (enquiry.flightType) details.push(`Flight: ${enquiry.flightType}`);
    if (enquiry.jobName) details.push(`Job: ${enquiry.jobName}`);
    if (enquiry.ideaTitle) details.push(`Idea: ${enquiry.ideaTitle}`);
    if (enquiry.course_interested) details.push(`Course: ${enquiry.course_interested}`);
    if (enquiry.propertyType) details.push(`Property: ${enquiry.propertyType}`);
    
    return details.length > 0 ? details.join(', ') : 'General enquiry';
  };

  if (enquiries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No enquiries found</h3>
        <p className="text-gray-500">All customer enquiries will appear here</p>
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
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category & Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
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
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {(enquiry.name || enquiry.user?.name)?.charAt(0)?.toUpperCase() || 'C'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {enquiry.name || enquiry.user?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enquiry.email || enquiry.user?.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enquiry.phone || enquiry.user?.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {enquiry.category?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getEnquiryType(enquiry)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {getLocationInfo(enquiry)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs">
                    <div className="font-medium mb-1">
                      {getEnquiryDetails(enquiry)}
                    </div>
                    <div className="text-gray-600 truncate">
                      {enquiry.message}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(enquiry.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(enquiry.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onView(enquiry._id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    
                    <select
                      value={enquiry.status}
                      onChange={(e) => onStatusUpdate(enquiry._id, e.target.value)}
                      className="text-xs text-black border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => onDelete(enquiry._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
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

export default EnquiryList;