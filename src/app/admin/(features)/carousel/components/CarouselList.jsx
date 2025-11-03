import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

const CarouselList = ({ 
  carousels, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onFeaturedToggle,
  categories,
  loading 
}) => {
  const getStatusBadge = (isActive) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (isActive) {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const getCategoryLabel = (categoryValue) => {
    // Handle both string category ID and category object
    const categoryId = typeof categoryValue === 'object' 
      ? categoryValue?._id 
      : categoryValue;
    
    const category = categories.find(cat => cat.value === categoryId);
    return category ? category.label : (categoryValue?.name || 'No Category');
  };

  const getPageLabel = (page) => {
    if (!page) return 'None';
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading carousels...</p>
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
                Carousel Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category & Page
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {carousels.map((carousel) => (
              <tr key={carousel._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-16 w-24 flex-shrink-0">
                      <img
                        className="h-16 w-24 rounded-lg object-cover"
                        src={carousel.image}
                        alt={carousel.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/96x64?text=Image';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {carousel.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {carousel.subtitle}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <strong>Category:</strong> {getCategoryLabel(carousel.category)}
                  </div>
                  <div className="text-sm text-gray-500">
                    <strong>Page:</strong> {getPageLabel(carousel.page)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={carousel.isActive}
                    onChange={(e) => onStatusChange(carousel._id, e.target.value === 'true')}
                    className={`text-sm border-none focus:ring-0 focus:outline-none ${getStatusBadge(carousel.isActive)}`}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(carousel.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(carousel)}
                      className="text-blue-600 hover:text-blue-900 px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      <Edit></Edit>
                    </button>
                    <button
                      onClick={() => onDelete(carousel._id)}
                      className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded hover:bg-red-50"
                    >
                      <Trash2></Trash2>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {carousels.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No carousel items</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new carousel item.</p>
        </div>
      )}
    </div>
  );
};

export default CarouselList;