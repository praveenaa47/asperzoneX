"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseList from "./components/CourseList";
import CourseModal from "./components/CourseModal";
import DeleteConfirmationModal from "../../components/DeleteModal";
import { useToast } from "../../components/Toast";
import { addCourse, deleteCourse, getCourses, updateCourse } from "@/redux/slices/courseSlice";

const CourseManagement = () => {
  const dispatch = useDispatch();
  const { data: courses, loading, error } = useSelector((state) => state.courses);
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    levelFilter: 'all',
    modeFilter: 'all',
    statusFilter: 'all'
  });

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      course.shortName?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      course.about?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesLevel = filters.levelFilter === 'all' || course.level === filters.levelFilter;
    const matchesMode = filters.modeFilter === 'all' || course.mode === filters.modeFilter;
    const matchesStatus = filters.statusFilter === 'all' || course.isActive === (filters.statusFilter === 'active');

    return matchesSearch && matchesLevel && matchesMode && matchesStatus;
  });

  const handleAddCourse = () => {
    setEditingCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleSaveCourse = async (courseData) => {
    try {
      const formData = new FormData();

      
      formData.append('name', courseData.name);
      formData.append('shortName', courseData.shortName);
      formData.append('duration', courseData.duration);
      formData.append('mode', courseData.mode);
      formData.append('level', courseData.level);
      formData.append('eligibility', courseData.eligibility);
      formData.append('intakes', courseData.intakes);
      formData.append('about', courseData.about);
      formData.append('isActive', courseData.isActive.toString());
      formData.append('isFeatured', courseData.isFeatured.toString());

      
      if (courseData.bannerImage instanceof File) {
        formData.append('bannerImage', courseData.bannerImage);
      }

      
      courseData.keyHighlights.forEach((highlight, index) => {
        formData.append(`keyHighlights[${index}][title]`, highlight.title);
        if (highlight.iconFile instanceof File) {
          formData.append(`highlightIcons`, highlight.iconFile);
        } else if (highlight.icon) {
          formData.append(`keyHighlights[${index}][icon]`, highlight.icon);
        }
      });

      
      courseData.careerOpportunities.forEach((opportunity, index) => {
        formData.append(`careerOpportunities[${index}][title]`, opportunity.title);
        if (opportunity.iconFile instanceof File) {
          formData.append(`opportunityIcons`, opportunity.iconFile);
        } else if (opportunity.icon) {
          formData.append(`careerOpportunities[${index}][icon]`, opportunity.icon);
        }
      });

      
      courseData.admissionRequirements.forEach((requirement, index) => {
        formData.append(`admissionRequirements[${index}]`, requirement);
      });

      
      courseData.feeStructure.forEach((fee, index) => {
        formData.append(`feeStructure[${index}]`, fee);
      });

      if (editingCourse) {
        await dispatch(updateCourse({ id: editingCourse._id, formData })).unwrap();
        addToast("success", "Course updated successfully ✅");
      } else {
        await dispatch(addCourse(formData)).unwrap();
        addToast("success", "Course added successfully ✅");
      }

      setIsModalOpen(false);
      setEditingCourse(null);
    } catch (error) {
      console.error('Failed to save course:', error);
      addToast("error", "Failed to save course ❌");
    }
  };

  const handleDeleteCourse = (id) => {
    setCourseToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      setDeleteLoading(true);
      await dispatch(deleteCourse(courseToDelete)).unwrap();
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
      addToast("success", "Course deleted successfully ✅");
    } catch (error) {
      console.error("Delete failed:", error);
      addToast("error", "Failed to delete course ❌");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (id, isActive) => {
    try {
      const formData = new FormData();
      formData.append('isActive', isActive.toString());

      await dispatch(updateCourse({ id, formData })).unwrap();
      addToast("success", "Course status updated successfully ✅");
    } catch (error) {
      console.error('Failed to update status:', error);
      addToast("error", "Failed to update course status ❌");
    }
  };

  const handleFeaturedToggle = async (id, isFeatured) => {
    try {
      const formData = new FormData();
      formData.append('isFeatured', isFeatured.toString());

      await dispatch(updateCourse({ id, formData })).unwrap();
      addToast("success", "Course featured status updated successfully ✅");
    } catch (error) {
      console.error('Failed to toggle featured:', error);
      addToast("error", "Failed to update course featured status ❌");
    }
  };

  const levels = [
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'postgraduate', label: 'Postgraduate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate' }
  ];

  const modes = [
    { value: 'Online', label: 'Online' },
    { value: 'Offline', label: 'Offline' },
    { value: 'Hybrid', label: 'Hybrid' },
    { value: 'On-Campus', label: 'On-Campus' }
  ];

  
  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  
  if (error && courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading courses: {error}</p>
          <button
            onClick={() => dispatch(getCourses())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Manage your educational courses and programs</p>
        </div>

        {}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {}
              <select
                value={filters.levelFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, levelFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                {levels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>

              <select
                value={filters.modeFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, modeFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Modes</option>
                {modes.map(mode => (
                  <option key={mode.value} value={mode.value}>{mode.label}</option>
                ))}
              </select>

              <select
                value={filters.statusFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
                className="px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {}
            <button
              onClick={handleAddCourse}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center whitespace-nowrap"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Course
            </button>
          </div>
        </div>

        {}
        <CourseList
          courses={filteredCourses}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
          onStatusChange={handleStatusChange}
          onFeaturedToggle={handleFeaturedToggle}
        />

        {}
        {isModalOpen && (
          <CourseModal
            course={editingCourse}
            levels={levels}
            modes={modes}
            onSave={handleSaveCourse}
            onClose={() => {
              setIsModalOpen(false);
              setEditingCourse(null);
            }}
          />
        )}

        {}
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setCourseToDelete(null);
          }}
          onConfirm={confirmDelete}
          loading={deleteLoading}
          title="Delete Course"
          message="Are you sure you want to delete this course? This action cannot be undone."
        />
      </div>
    </div>
  );
};

export default CourseManagement;