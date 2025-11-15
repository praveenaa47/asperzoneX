"use client";
import { getCourses } from "@/redux/slices/courseSlice";
import { ArrowRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Programs() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    data: courses,
    loading,
    error,
  } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  {
    loading && <p className="text-center text-gray-500">Loading programs...</p>;
  }

  {
    error && (
      <p className="text-center text-red-500">
        Failed to load courses: {error}
      </p>
    );
  }

  {
    !loading && courses?.length === 0 && (
      <p className="text-center text-gray-600">No programs available.</p>
    );
  }

  return (
    <div className="bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-center text-black mb-6 sm:mb-8 md:mb-10">
          Explore Our Programs
        </h2>

        {/* Mobile 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
          {courses?.map((course) => (
            <div
              key={course._id}
              onClick={()=>router.push(`/course-detail/${course._id}`)}
              className="group bg-white rounded-lg shadow-md overflow-hidden active:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.bannerImage}
                  alt={course.title}
                  className="w-full h-32 xs:h-40 object-cover"
                />
              </div>

              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                  {course.shortName}
                </h3>
                <p className="text-xs font-normal text-gray-500 line-clamp-2">
                  {course.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet 2 Columns */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-5">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={()=>router.push(`/course-detail/${course._id}`)}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.bannerImage}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-5 relative overflow-hidden">
                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                    {course.shortName}
                  </h3>
                  <p className="text-sm font-normal text-gray-500 mb-3 line-clamp-2">
                    {course.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop 4 Columns */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              onClick={()=>router.push(`/course-detail/${course._id}`)}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.bannerImage}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-5 relative overflow-hidden">
                <div className="transform transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                    {course.shortName}
                  </h3>
                  <p className="text-sm font-normal text-gray-500 mb-3 line-clamp-2">
                    {course.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
