"use client";
import React, { useState } from "react";
import { Mail, Phone, Calendar, MapPin } from "lucide-react";
import { addEnquiry } from "@/redux/slices/enquirySlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";

export default function SupportForm() {
  const dispatch = useDispatch();
  const params = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    startDate: "",
    endDate: "",
    adults: 1,
    children: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      category: params?.id, // 👈 send category id from params
      startDate: formData.startDate,
      endDate: formData.endDate,
      numberOfTravelers: {
        adults: Number(formData.adults),
        children: Number(formData.children),
      },
    };

    dispatch(addEnquiry(payload)).then((res) => {
      if (res?.payload?.success) {
        alert("Enquiry submitted successfully!");
      } else {
        alert("Failed to submit enquiry.");
      }
    });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-xl font-bold text-center mb-2">Enquiry Now</h1>
        <p className="text-gray-600 text-center mb-6">
          We will get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                <Mail className="inline w-4 h-4 mr-1" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Travel Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Adults & Children */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Adults
              </label>
              <input
                type="number"
                min="1"
                name="adults"
                value={formData.adults}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">
                Children
              </label>
              <input
                type="number"
                min="0"
                name="children"
                value={formData.children}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded-md shadow-md hover:bg-blue-700"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
