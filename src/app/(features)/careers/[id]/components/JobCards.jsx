"use client";
import {  getUserJobs } from "@/redux/slices/jobSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const JobListings = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
   const [showAll, setShowAll] = useState(false);
     const visibleJobs = showAll ? jobs : jobs.slice(0, 2);
const router = useRouter();

  useEffect(() => {
    dispatch(getUserJobs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
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

  if (!jobs.length) {
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-gray-500 text-lg">No job listings found.</p>
      </div>
    );
  }

  return (
    <div className=" p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Job Listings
        </h1>

        <div className="space-y-4">
          {visibleJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {}
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-12 h-12 object-contain rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {job.companyName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {job.location?.city}, {job.location?.country}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>{" "}
              </div>

              {}
              <div className="mb-3">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 max-w-[70%] leading-tight">
                  {job.title}
                </h2>
                <p className="text-sm bg-[#fcf8fcf7] rounded-xl font-semibold text-[#d08dff] inline-block px-3 py-1">
                  {job?.jobOverview?.jobLevel}
                </p>
              </div>

              {}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {job.overview}
              </p>

              {}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-lg font-semibold text-gray-900">
                 {job.salary.currency}- {job.salary.amount}  /{" "}
                  
                  <span className="text-sm font-normal text-gray-500">
                    {job.salary?.period}
                  </span>
                </div>
                <button
                onClick={()=>router.push(`/careers/jobdetails/${job._id}`)}
                 className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors w-full sm:w-auto">
                  Enquire now
                </button>
              </div>
            </div>
          ))}
        </div>

        {}
         {jobs.length > 2 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
