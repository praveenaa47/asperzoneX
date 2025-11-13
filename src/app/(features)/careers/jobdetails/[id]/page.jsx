"use client";
import React, { useEffect } from "react";
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Clock,
  Calendar,
} from "lucide-react";
import Header from "@/components/home/Header";
import AspireZonesFooter from "@/components/Footer";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob } from "@/redux/slices/jobSlice";

export default function JobPosting() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleJob, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(getSingleJob(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-lg">Loading job...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-lg">No job found.</p>
      </div>
    );
  }

  const job = singleJob;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-3 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
              <div className="p-4 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center flex-shrink-0 ">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-12 h-12 object-contain rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="text-sm text-gray-600">
                        at {job.companyName}
                      </span>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded uppercase">
                        {job.jobType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {}
              <div className="px-4 md:px-6 pb-4">
                <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">
                  Overview
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {job.overview}
                </p>
              </div>

              {}
              {job.keyResponsibilities?.length > 0 && (
                <div className="px-4 md:px-6 pb-4">
                  <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-2">
                    {job.keyResponsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {}
              {job.qualifications?.length > 0 && (
                <div className="px-4 md:px-6 pb-4">
                  <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">
                    Qualifications
                  </h2>
                  <ul className="space-y-2">
                    {job.qualifications.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {}
              {job.whyJoinUs?.length > 0 && (
                <div className="px-4 md:px-6 pb-6">
                  <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3">
                    Why Join Us
                  </h2>
                  <ul className="space-y-2">
                    {job.whyJoinUs
                      .filter((item) => item.trim() !== "")
                      .map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {}
            <div className="space-y-4">
              {}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                Enquire Now
              </button>

              {}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {}
                <div className="bg-white rounded-lg shadow-sm p-5 text-center border border-gray-100">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-500 mb-1">Salary</div>
                  <div className="text-lg font-bold text-gray-900">
                    ₹{job.salary?.amount?.toLocaleString()} /{" "}
                    {job.salary?.period}
                  </div>
                </div>

                {}
                <div className="bg-white rounded-lg shadow-sm p-5 text-center border border-gray-100">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-500 mb-1">Job Location</div>
                  <div className="text-lg font-bold text-gray-900">
                    {job.location?.city}, {job.location?.country}
                  </div>
                </div>
              </div>

              {}
              <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Job Overview
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">
                        Job Posted:
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">
                        Education
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {job.jobOverview?.education}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">
                        Job Level:
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {job.jobOverview?.jobLevel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">
                        Experience
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {job.jobOverview?.experience}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AspireZonesFooter />
    </div>
  );
}
