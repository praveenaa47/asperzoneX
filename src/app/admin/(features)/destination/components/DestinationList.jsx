import React from 'react';
import { Edit, Trash2, Star, MapPin } from 'lucide-react';

const DestinationList = ({ 
  destinations, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onFeaturedToggle,
  loading 
}) => {
  const getStatusBadge = (isActive) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading destinations...</p>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow text-center py-12">
        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
        <p className="text-gray-500">Get started by adding your first destination</p>
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
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Highlights
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
            {destinations.map((destination) => (
              <tr key={destination._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-lg overflow-hidden">
                      {destination.coverImage ? (
                        <img
                          src={destination.coverImage}
                          alt={destination.name}
                          className="h-12 w-12 object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-300 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {destination.name}
                      </div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {destination.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {destination.keyHighlights?.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                      >
                        {highlight.title}
                      </span>
                    ))}
                    {destination.keyHighlights?.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                        +{destination.keyHighlights.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(destination.isActive)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getFeaturedBadge(destination.isFeatured)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(destination)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(destination._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {/* <button
                      onClick={() => onFeaturedToggle(destination._id)}
                      className={`${
                        destination.isFeatured ? 'text-yellow-600' : 'text-gray-400'
                      } hover:text-yellow-700`}
                      title={destination.isFeatured ? 'Remove Featured' : 'Mark Featured'}
                    >
                      <Star className="w-4 h-4" fill={destination.isFeatured ? 'currentColor' : 'none'} />
                    </button> */}
                    <select
                      value={destination.isActive}
                      onChange={(e) => onStatusChange(destination._id, e.target.value === 'true')}
                      className="text-xs border text-black border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
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

export default DestinationList;