import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image } from 'lucide-react';

const ConsultingForm = ({ data, onSave, onCancel, loading = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        bannerImage: '',
        introduction: {
            description: '',
            image: ''
        },
        sections: [],
        gallery: []
    });

    const [bannerPreview, setBannerPreview] = useState('');
    const [introductionPreview, setIntroductionPreview] = useState('');
    const [sectionPreviews, setSectionPreviews] = useState({});
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setFormData(data);
            setBannerPreview(data.bannerImage || '');
            setIntroductionPreview(data.introduction?.image || '');
            
            // Set section previews
            const sectionPrev = {};
            data.sections?.forEach((section, index) => {
                sectionPrev[index] = section.image;
            });
            setSectionPreviews(sectionPrev);
            
            // Set gallery previews
            setGalleryPreviews(data.gallery?.map(item => item.image) || []);
        }
    }, [data]);

    const handleInputChange = (path, value) => {
        const keys = path.split('.');
        setFormData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newData;
        });

        // Clear errors when user types
        if (errors[path]) {
            setErrors(prev => ({
                ...prev,
                [path]: ''
            }));
        }
    };

    const handleSectionChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.map((section, i) =>
                i === index ? { ...section, [field]: value } : section
            )
        }));
    };

    // File upload handlers with preview
    const handleBannerImageChange = (file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBannerPreview(imageUrl);
            handleInputChange('bannerImage', file);
        }
    };

    const handleIntroductionImageChange = (file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setIntroductionPreview(imageUrl);
            setFormData(prev => ({
                ...prev,
                introduction: {
                    ...prev.introduction,
                    image: file
                }
            }));
        }
    };

    const handleSectionImageChange = (index, file) => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSectionPreviews(prev => ({
                ...prev,
                [index]: imageUrl
            }));
            setFormData(prev => ({
                ...prev,
                sections: prev.sections.map((section, i) =>
                    i === index ? { ...section, image: file } : section
                )
            }));
        }
    };

    const handleGalleryImageChange = (files) => {
        const newFiles = Array.from(files);
        const newPreviews = [];
        
        newFiles.forEach(file => {
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                newPreviews.push(imageUrl);
            }
        });

        setGalleryPreviews(prev => [...prev, ...newPreviews]);
        setFormData(prev => ({
            ...prev,
            gallery: [
                ...prev.gallery,
                ...newFiles.map(file => ({ image: file }))
            ]
        }));
    };

    const handleRemoveBannerImage = () => {
        setBannerPreview('');
        handleInputChange('bannerImage', '');
    };

    const handleRemoveIntroductionImage = () => {
        setIntroductionPreview('');
        setFormData(prev => ({
            ...prev,
            introduction: {
                ...prev.introduction,
                image: ''
            }
        }));
    };

    const handleRemoveSectionImage = (index) => {
        setSectionPreviews(prev => {
            const newPreviews = { ...prev };
            delete newPreviews[index];
            return newPreviews;
        });
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.map((section, i) =>
                i === index ? { ...section, image: '' } : section
            )
        }));
    };

    const handleRemoveGalleryImage = (index) => {
        const newPreviews = galleryPreviews.filter((_, i) => i !== index);
        const newGallery = formData.gallery.filter((_, i) => i !== index);
        
        setGalleryPreviews(newPreviews);
        setFormData(prev => ({
            ...prev,
            gallery: newGallery
        }));
    };

    const addSection = () => {
        setFormData(prev => ({
            ...prev,
            sections: [
                ...prev.sections,
                { title: '', description: '', image: '' }
            ]
        }));
    };

    const removeSection = (index) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== index)
        }));
        setSectionPreviews(prev => {
            const newPreviews = { ...prev };
            delete newPreviews[index];
            return newPreviews;
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
        if (!formData.bannerImage) newErrors.bannerImage = 'Banner image is required';
        if (!formData.introduction.description.trim()) newErrors.introduction = 'Introduction description is required';
        if (!formData.introduction.image) newErrors.introductionImage = 'Introduction image is required';

        // Validate sections
        formData.sections.forEach((section, index) => {
            if (!section.title.trim()) {
                newErrors[`sectionTitle_${index}`] = 'Section title is required';
            }
            if (!section.description.trim()) {
                newErrors[`sectionDescription_${index}`] = 'Section description is required';
            }
            if (!section.image) {
                newErrors[`sectionImage_${index}`] = 'Section image is required';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {data ? 'Edit Consulting Page' : 'Create Consulting Page'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Banner Section */}
                    <div className="border-b pb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Banner Section</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Main Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.title ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter main title"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subtitle *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subtitle}
                                        onChange={(e) => handleInputChange('subtitle', e.target.value)}
                                        className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.subtitle ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter subtitle"
                                    />
                                    {errors.subtitle && (
                                        <p className="mt-1 text-sm text-red-600">{errors.subtitle}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Banner Image *</h4>
                                
                                {bannerPreview && (
                                    <div className="mb-3">
                                        <div className="relative inline-block">
                                            <img
                                                src={bannerPreview}
                                                alt="Banner Preview"
                                                className="w-32 h-20 object-cover rounded-lg border"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveBannerImage}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Image size={24} className="mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload banner image</span>
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleBannerImageChange(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                                {errors.bannerImage && (
                                    <p className="mt-1 text-sm text-red-600">{errors.bannerImage}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Introduction Section */}
                    <div className="border-b pb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Introduction Section</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.introduction.description}
                                    onChange={(e) => handleInputChange('introduction.description', e.target.value)}
                                    rows={4}
                                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.introduction ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter detailed introduction description..."
                                />
                                {errors.introduction && (
                                    <p className="mt-1 text-sm text-red-600">{errors.introduction}</p>
                                )}
                            </div>
                            
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Introduction Image *</h4>
                                
                                {introductionPreview && (
                                    <div className="mb-3">
                                        <div className="relative inline-block">
                                            <img
                                                src={introductionPreview}
                                                alt="Introduction Preview"
                                                className="w-32 h-20 object-cover rounded-lg border"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveIntroductionImage}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Image size={24} className="mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload introduction image</span>
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleIntroductionImageChange(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                                {errors.introductionImage && (
                                    <p className="mt-1 text-sm text-red-600">{errors.introductionImage}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Services Sections */}
                    <div className="border-b pb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Services Sections</h3>
                            <button
                                type="button"
                                onClick={addSection}
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                            >
                                <Plus size={16} className="mr-1" />
                                Add Section
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.sections.map((section, index) => (
                                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-md font-medium text-gray-900">Service Section {index + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => removeSection(index)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Service Title *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={section.title}
                                                    onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors[`sectionTitle_${index}`] ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                    placeholder="Enter service title"
                                                />
                                                {errors[`sectionTitle_${index}`] && (
                                                    <p className="mt-1 text-sm text-red-600">{errors[`sectionTitle_${index}`]}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Service Description *
                                                </label>
                                                <textarea
                                                    value={section.description}
                                                    onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                                                    rows={3}
                                                    className={`w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors[`sectionDescription_${index}`] ? 'border-red-300' : 'border-gray-300'
                                                    }`}
                                                    placeholder="Enter service description"
                                                />
                                                {errors[`sectionDescription_${index}`] && (
                                                    <p className="mt-1 text-sm text-red-600">{errors[`sectionDescription_${index}`]}</p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Service Image *</h4>
                                            
                                            {sectionPreviews[index] && (
                                                <div className="mb-3">
                                                    <div className="relative inline-block">
                                                        <img
                                                            src={sectionPreviews[index]}
                                                            alt="Section Preview"
                                                            className="w-32 h-20 object-cover rounded-lg border"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSectionImage(index)}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Image size={24} className="mb-3 text-gray-400" />
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload service image</span>
                                                        </p>
                                                        <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleSectionImageChange(index, e.target.files[0])}
                                                    />
                                                </label>
                                            </div>
                                            {errors[`sectionImage_${index}`] && (
                                                <p className="mt-1 text-sm text-red-600">{errors[`sectionImage_${index}`]}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="border-b pb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Gallery Images</h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">
                                    {galleryPreviews.length} images
                                </span>
                                <label className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center cursor-pointer">
                                    <Plus size={16} className="mr-1" />
                                    Add Images
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleGalleryImageChange(e.target.files)}
                                    />
                                </label>
                            </div>
                        </div>

                        {galleryPreviews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {galleryPreviews.map((preview, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={preview}
                                            alt={`Gallery ${index + 1}`}
                                            className="h-24 w-full object-cover rounded-lg border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveGalleryImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Image size={24} className="mb-3 text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB each)</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleGalleryImageChange(e.target.files)}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                data ? 'Update Consulting Page' : 'Create Consulting Page'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConsultingForm;