import React from 'react';
import { Plus, X } from 'lucide-react';

const ImagesSection = ({ imagePreviews, errors, handleImageChange, handleRemoveImage }) => {
  const onFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleImageChange(files);
  };

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Images & Video</h2>
      <p className="text-sm text-gray-500 mb-4">Upload your image/video, max 10 images</p>
      
      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="h-24 w-full object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* File Input */}
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Plus className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB each)</p>
            <p className="text-xs text-gray-500 mt-1">Max 10 images</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={onFileChange}
          />
        </label>
      </div>
      {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
    </div>
  );
};

export default ImagesSection;