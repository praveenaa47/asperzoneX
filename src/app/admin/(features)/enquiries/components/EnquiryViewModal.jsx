import { getEnquiryById, updateEnquiryStatus } from '@/redux/slices/enquirySlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EnquiryViewModal = ({ enquiryId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { selectedEnquiry, loading } = useSelector((state) => state.enquiries);
  const [status, setStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen && enquiryId) {
      dispatch(getEnquiryById(enquiryId));
    }
  }, [isOpen, enquiryId, dispatch]);

  useEffect(() => {
    if (selectedEnquiry) {
      setStatus(selectedEnquiry.status);
      setAdminNotes(selectedEnquiry.adminNotes || '');
    }
  }, [selectedEnquiry]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleStatusUpdate = async () => {
    if (!selectedEnquiry) return;

    try {
      setIsUpdating(true);
      await dispatch(updateEnquiryStatus({
        id: selectedEnquiry._id,
        status: status
      })).unwrap();
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

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
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderCategorySpecificFields = () => {
    if (!selectedEnquiry) return null;

    const enquiry = selectedEnquiry;
    const category = enquiry.category?.name;

    switch (category) {
      case 'Travel & Holidays':
        return renderTravelFields(enquiry);
      case 'Real Estate':
        return renderRealEstateFields(enquiry);
      case 'Higher education':
        return renderEducationFields(enquiry);
      case 'Finance and business':
        return renderFinanceFields(enquiry);
      case 'Talent & Careers':
        return renderCareerFields(enquiry);
      case 'Inovaate':
        return renderInnovationFields(enquiry);
      default:
        return renderGeneralFields(enquiry);
    }
  };

  const renderTravelFields = (enquiry) => (
    <div className="space-y-4">
      {/* Flight Details */}
      {(enquiry.flightType || enquiry.from) && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Flight Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {enquiry.flightType && <div><strong>Flight Type:</strong> {enquiry.flightType}</div>}
            {enquiry.from && <div><strong>From:</strong> {enquiry.from}</div>}
            {enquiry.to && <div><strong>To:</strong> {enquiry.to}</div>}
            {enquiry.departureDate && <div><strong>Departure:</strong> {new Date(enquiry.departureDate).toLocaleDateString()}</div>}
            {enquiry.returnDate && <div><strong>Return:</strong> {new Date(enquiry.returnDate).toLocaleDateString()}</div>}
            {enquiry.travelersCount && <div><strong>Travelers:</strong> {enquiry.travelersCount}</div>}
            {enquiry.travelClass && <div><strong>Class:</strong> {enquiry.travelClass}</div>}
          </div>
        </div>
      )}

      {/* Tour Details */}
      {(enquiry.tourType || enquiry.duration) && (
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">Tour Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {enquiry.tourType && <div><strong>Tour Type:</strong> {enquiry.tourType}</div>}
            {enquiry.duration && <div><strong>Duration:</strong> {enquiry.duration}</div>}
            {enquiry.tour_startDate && <div><strong>Start Date:</strong> {new Date(enquiry.tour_startDate).toLocaleDateString()}</div>}
            {enquiry.tour_endDate && <div><strong>End Date:</strong> {new Date(enquiry.tour_endDate).toLocaleDateString()}</div>}
            {enquiry.tourTravelers && <div><strong>Travelers:</strong> {enquiry.tourTravelers}</div>}
            {enquiry.country && <div><strong>Country:</strong> {enquiry.country}</div>}
            {enquiry.state && <div><strong>State:</strong> {enquiry.state}</div>}
            {enquiry.city && <div><strong>City:</strong> {enquiry.city}</div>}
          </div>
        </div>
      )}

      {/* Hotel Details */}
      {(enquiry.hotelName || enquiry.propertyType) && (
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-2">Accommodation Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {enquiry.hotelName && <div><strong>Hotel:</strong> {enquiry.hotelName}</div>}
            {enquiry.propertyType && <div><strong>Property Type:</strong> {enquiry.propertyType}</div>}
            {enquiry.starRating && <div><strong>Star Rating:</strong> {enquiry.starRating}</div>}
            {enquiry.destination && <div><strong>Destination:</strong> {enquiry.destination}</div>}
            {enquiry.hotel_location && <div><strong>Location:</strong> {enquiry.hotel_location}</div>}
            {enquiry.budget && <div><strong>Budget:</strong> {enquiry.budget}</div>}
            {enquiry.checkInDate && <div><strong>Check-in:</strong> {new Date(enquiry.checkInDate).toLocaleDateString()}</div>}
            {enquiry.checkOutDate && <div><strong>Check-out:</strong> {new Date(enquiry.checkOutDate).toLocaleDateString()}</div>}
            {enquiry.guests && <div><strong>Guests:</strong> {enquiry.guests}</div>}
            {enquiry.rooms && <div><strong>Rooms:</strong> {enquiry.rooms}</div>}
          </div>
        </div>
      )}

      {/* Package Details */}
      {enquiry.packageSelection && (
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-semibold text-orange-900 mb-2">Package Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {enquiry.packageSelection && <div><strong>Package:</strong> {enquiry.packageSelection}</div>}
            {enquiry.startDate && <div><strong>Start Date:</strong> {new Date(enquiry.startDate).toLocaleDateString()}</div>}
            {enquiry.endDate && <div><strong>End Date:</strong> {new Date(enquiry.endDate).toLocaleDateString()}</div>}
            {enquiry.numberOfTravelers && (
              <div>
                <strong>Travelers:</strong> {enquiry.numberOfTravelers.adults} adults, {enquiry.numberOfTravelers.children} children
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderRealEstateFields = (enquiry) => (
    <div className="bg-blue-50 rounded-lg p-4">
      <h4 className="font-semibold text-blue-900 mb-2">Appointment Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {enquiry.date && <div><strong>Date:</strong> {new Date(enquiry.date).toLocaleDateString()}</div>}
        {enquiry.time && <div><strong>Time:</strong> {enquiry.time}</div>}
      </div>
    </div>
  );

  const renderEducationFields = (enquiry) => (
    <div className="bg-green-50 rounded-lg p-4">
      <h4 className="font-semibold text-green-900 mb-2">Education Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {enquiry.student_location && <div><strong>Current Location:</strong> {enquiry.student_location}</div>}
        {enquiry.course_interested && <div><strong>Course Interested:</strong> {enquiry.course_interested}</div>}
        {enquiry.nationality && <div><strong>Nationality:</strong> {enquiry.nationality}</div>}
        {enquiry.qualification && <div><strong>Qualification:</strong> {enquiry.qualification}</div>}
        {enquiry.starting && <div><strong>Starting:</strong> {enquiry.starting}</div>}
        {enquiry.heard_from && <div><strong>Heard From:</strong> {enquiry.heard_from}</div>}
      </div>
    </div>
  );

  const renderFinanceFields = (enquiry) => (
    <div className="bg-purple-50 rounded-lg p-4">
      <h4 className="font-semibold text-purple-900 mb-2">Finance Enquiry</h4>
      <p className="text-sm">General finance and business enquiry</p>
    </div>
  );

  const renderCareerFields = (enquiry) => (
    <div className="bg-orange-50 rounded-lg p-4">
      <h4 className="font-semibold text-orange-900 mb-2">Career Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {enquiry.jobName && <div><strong>Job Interest:</strong> {enquiry.jobName}</div>}
        {enquiry.higherEducation && <div><strong>Education:</strong> {enquiry.higherEducation}</div>}
        {enquiry.preferredUniversity && <div><strong>Preferred University:</strong> {enquiry.preferredUniversity}</div>}
        {enquiry.cv && (
          <div className="md:col-span-2">
            <strong>CV:</strong>{' '}
            <a href={enquiry.cv} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Download CV
            </a>
          </div>
        )}
      </div>
    </div>
  );

  const renderInnovationFields = (enquiry) => (
    <div className="bg-pink-50 rounded-lg p-4">
      <h4 className="font-semibold text-pink-900 mb-2">Innovation Details</h4>
      <div className="space-y-3 text-sm">
        {enquiry.ideaTitle && <div><strong>Idea Title:</strong> {enquiry.ideaTitle}</div>}
        {enquiry.ideaDescription && (
          <div>
            <strong>Description:</strong>
            <p className="mt-1 text-gray-700">{enquiry.ideaDescription}</p>
          </div>
        )}
        {enquiry.currentStatus && <div><strong>Current Status:</strong> {enquiry.currentStatus}</div>}
        {enquiry.innovate_location && <div><strong>Location:</strong> {enquiry.innovate_location}</div>}
        {enquiry.videoLink && (
          <div>
            <strong>Video Link:</strong>{' '}
            <a href={enquiry.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              View Video
            </a>
          </div>
        )}
        {enquiry.referenceLink && (
          <div>
            <strong>Reference Link:</strong>{' '}
            <a href={enquiry.referenceLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              View Reference
            </a>
          </div>
        )}
        {enquiry.image && (
          <div>
            <strong>Image:</strong>
            <img src={enquiry.image} alt="Idea" className="mt-2 max-w-xs rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );

  const renderGeneralFields = (enquiry) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 mb-2">General Enquiry</h4>
      <p className="text-sm">No additional details provided.</p>
    </div>
  );

  const renderAttachments = () => {
    if (!selectedEnquiry?.attachments || selectedEnquiry.attachments.length === 0) {
      return null;
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedEnquiry.attachments.map((attachment, index) => (
            <div key={attachment._id || index} className="border rounded-lg p-3">
              {attachment.fileType?.startsWith('image/') ? (
                <div>
                  <img 
                    src={attachment.fileUrl} 
                    alt={attachment.fileName} 
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-medium truncate">{attachment.fileName}</p>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm font-medium truncate">{attachment.fileName}</p>
                  <a 
                    href={attachment.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading enquiry details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedEnquiry) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Enquiry</h3>
            <p className="text-gray-500 mb-4">Failed to load enquiry details.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const enquiry = selectedEnquiry;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Enquiry Details</h2>
            <p className="text-gray-600 mt-1">
              {enquiry.category?.name} • {enquiry.name || enquiry.user?.name}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(enquiry.status)}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900 font-medium">{enquiry.name || enquiry.user?.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900 font-medium">{enquiry.email || enquiry.user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-900 font-medium">{enquiry.phone || enquiry.user?.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enquiry Date</label>
                    <p className="text-gray-900 font-medium">{formatDate(enquiry.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Category Specific Details */}
              {renderCategorySpecificFields()}

              {/* Message */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
                </div>
              </div>

              {/* Attachments */}
              {renderAttachments()}

              {/* Admin Notes */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Notes</h3>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this enquiry..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  rows="4"
                />
                <p className="text-sm text-gray-500 mt-2">These notes are for internal use only.</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Update */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="responded">Responded</option>
                      <option value="closed">Closed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isUpdating || status === enquiry.status}
                    className={`w-full px-4 py-2 text-white rounded-lg flex items-center justify-center space-x-2 ${
                      isUpdating || status === enquiry.status
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Update Status</span>
                      </>
                    )}
                  </button>

                  {status !== enquiry.status && (
                    <p className="text-sm text-green-600 text-center">
                      Status will be updated from {getStatusBadge(enquiry.status)} to {getStatusBadge(status)}
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${enquiry.email || enquiry.user?.email}`}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Send Email</span>
                  </a>
                  
                  {(enquiry.phone || enquiry.user?.phone) && (
                    <a
                      href={`tel:${enquiry.phone || enquiry.user?.phone}`}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 01-.502 1.21l-4.493 1.498a1 1 0 01-.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Call Customer</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Enquiry Metadata */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enquiry Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{enquiry.category?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enquiry ID</span>
                    <span className="font-mono text-sm">{enquiry._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created</span>
                    <span className="text-sm">{formatDate(enquiry.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="text-sm">{formatDate(enquiry.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryViewModal;