import React from 'react';
import { X } from 'lucide-react';

const TagsSection = ({ formData, updateFormData }) => {
  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    updateFormData('tags', newTags);
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newTags = [...formData.tags, e.target.value.trim().toLowerCase()];
      updateFormData('tags', newTags);
      e.target.value = "";
    }
  };

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                className="text-red-600"
                onClick={() => removeTag(index)}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>

        <input
          type="text"
          placeholder="Press Enter to add a tag"
          className="w-full bg-white px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          onKeyDown={handleTagInput}
        />
      </div>
    </div>
  );
};

export default TagsSection;