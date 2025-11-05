import React from 'react';

const CarList = ({ cars, onEdit, onDelete, onStatusChange, onFeaturedToggle, onView }) => {
  const getStatusBadge = (isActive) => {
    const statusClasses = {
      true: 'bg-green-100 text-green-800',
      false: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[isActive]}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const getFeaturedBadge = (isFeatured) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${isFeatured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
        }`}>
        {isFeatured ? 'Featured' : 'Standard'}
      </span>
    );
  };

  const getConditionBadge = (condition) => {
    const conditionClasses = {
      new: 'bg-blue-100 text-blue-800',
      used: 'bg-orange-100 text-orange-800',
      'certified-pre-owned': 'bg-purple-100 text-purple-800'
    };

    const conditionLabels = {
      new: 'New',
      used: 'Used',
      'certified-pre-owned': 'Certified'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${conditionClasses[condition] || 'bg-gray-100 text-gray-800'}`}>
        {conditionLabels[condition] || condition}
      </span>
    );
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';

    const value = price.totalPrice || price.basePrice || 0;

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: price.currency || "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatKms = (kms) => {
    return new Intl.NumberFormat('en-US').format(kms) + ' km';
  };

  if (cars.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
        <p className="text-gray-500">Get started by adding your first car listing</p>
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
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-16 bg-gray-200 rounded-lg overflow-hidden">
                      {car.media && car.media.length > 0 ? (
                        <img
                          src={car.media[0].url}
                          alt={car.title}
                          className="h-12 w-16 object-cover"
                        />
                      ) : (
                        <div className="h-12 w-16 bg-gray-300 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {car.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {car.brand} • {car.model}
                      </div>
                      <div className="text-xs text-gray-400">
                        {car.year} • {car.bodyType}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatKms(car.kmsDriven)}
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {car.fuelType} • {car.transmission}
                  </div>
                  <div className="text-sm text-gray-500">
                    {car.engineCapacity} • {car.power}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getConditionBadge(car.condition)}
                  <div className="text-sm text-gray-500 mt-1">
                    {car.ownerType}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{car.location?.city}</div>
                  <div className="text-sm text-gray-500">{car.location?.state}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(car.price)}
                  </div>
                  {car.price?.isNegotiable && (
                    <div className="text-xs text-green-600">Negotiable</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(car.isActive)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getFeaturedBadge(car.isFeatured)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    {/* View Button */}
                    <button
                      onClick={() => onView(car._id)}
                      className="text-green-600 hover:text-green-900"
                      title="View Details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => onEdit(car)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(car._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onFeaturedToggle(car._id)}
                      className={`${car.isFeatured ? 'text-yellow-600' : 'text-gray-400'
                        } hover:text-yellow-700`}
                      title={car.isFeatured ? 'Remove Featured' : 'Mark Featured'}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                    <select
                      value={car.isActive ? 'active' : 'inactive'}
                      onChange={(e) => onStatusChange(car._id, e.target.value)}
                      className="text-xs text-black border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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

export default CarList;