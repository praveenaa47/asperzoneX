// components/SingleCarModal.jsx
import React from 'react';

const SingleCarModal = ({ car, isOpen, onClose, loading }) => {
  if (!isOpen || !car) return null;

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    const value = price.totalPrice || price.basePrice || 0;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: price.currency || "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved: { color: 'bg-blue-100 text-blue-800', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Car Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading car details...</p>
          </div>
        ) : (
          <div className="p-6">
            {/* Images Gallery */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {car.media && car.media.length > 0 ? (
                  car.media.map((media, index) => (
                    <div key={media._id} className="relative">
                      <img
                        src={media.url}
                        alt={`${car.title} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <span className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {media.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    No images available
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Title</label>
                    <p className="text-sm text-gray-900">{car.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Brand & Model</label>
                    <p className="text-sm text-gray-900">{car.brand} • {car.model}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Year</label>
                    <p className="text-sm text-gray-900">{car.year}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Color</label>
                    <p className="text-sm text-gray-900 capitalize">{car.color}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Body Type</label>
                    <p className="text-sm text-gray-900 capitalize">{car.bodyType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Condition</label>
                    <p className="text-sm text-gray-900 capitalize">{car.condition}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-sm text-gray-900 mt-1">{car.description}</p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Technical Specifications</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Fuel Type</label>
                    <p className="text-sm text-gray-900 capitalize">{car.fuelType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Transmission</label>
                    <p className="text-sm text-gray-900 capitalize">{car.transmission}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">KMs Driven</label>
                    <p className="text-sm text-gray-900">{car.kmsDriven?.toLocaleString()} km</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Mileage</label>
                    <p className="text-sm text-gray-900">{car.mileage} kmpl</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Engine Capacity</label>
                    <p className="text-sm text-gray-900">{car.engineCapacity}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Power</label>
                    <p className="text-sm text-gray-900">{car.power}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Seating Capacity</label>
                    <p className="text-sm text-gray-900">{car.passengerCapacity || car.seatingCapacity} persons</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Owner Type</label>
                    <p className="text-sm text-gray-900 capitalize">{car.ownerType}</p>
                  </div>
                </div>
              </div>

              {/* Registration & Insurance */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Registration & Insurance</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Registration Year</label>
                    <p className="text-sm text-gray-900">{car.registrationYear}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Registration Number</label>
                    <p className="text-sm text-gray-900">{car.registrationNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Insurance Type</label>
                    <p className="text-sm text-gray-900 capitalize">{car.insuranceType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Insurance Valid Until</label>
                    <p className="text-sm text-gray-900">{car.insuranceValidUntil}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Spare Key Available</label>
                    <p className="text-sm text-gray-900">{car.spareKeyAvailable ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Pricing & Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Pricing & Location</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Price</label>
                    <p className="text-lg font-bold text-gray-900">{formatPrice(car.price)}</p>
                    {car.price?.isNegotiable && (
                      <p className="text-sm text-green-600">Price is negotiable</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Location</label>
                    <p className="text-sm text-gray-900">
                      {car.location?.address}, {car.location?.city}, {car.location?.state}, {car.location?.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Features</h3>
                
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Main Features</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {car.features?.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {car.additionalFeatures && car.additionalFeatures.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Additional Features</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {car.additionalFeatures.map((feature, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status & Metadata */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Status & Metadata</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(car.isActive ? 'active' : 'inactive')}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Featured</label>
                    <div className="mt-1">
                      {getStatusBadge(car.isFeatured ? 'active' : 'inactive')}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Approval Status</label>
                    <div className="mt-1">
                      {getStatusBadge(car.approvalStatus)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Views</label>
                    <p className="text-sm text-gray-900">{car.views || 0}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Enquiries</label>
                    <p className="text-sm text-gray-900">{car.enquiryCount || 0}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Posted By</label>
                    <p className="text-sm text-gray-900 capitalize">{car.postedBy?.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created At</label>
                    <p className="text-sm text-gray-900">{formatDate(car.createdAt)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Updated At</label>
                    <p className="text-sm text-gray-900">{formatDate(car.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCarModal;