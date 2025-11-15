"use client";
import { useState } from "react";
import { Calendar, Upload } from "lucide-react";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/UserToast";
import { addEnquiry } from "@/redux/slices/enquirySlice";

export default function TourForm({ categoryId }) {
  const [tourData, setTourData] = useState({
    country: "",
    state: "",
    city: "",
    tourType: "",
    startDate: "",
    endDate: "",
    duration: "",
    travelers: "",
    comments: "",
    attachment: null,
  });
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTourData({ ...tourData, attachment: file });
      const reader = new FileReader();
      reader.onloadend = () => setAttachmentPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitTourEnquiry = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        addToast("error", "Please login first", "error");
        return;
      }

      const form = new FormData();
      form.append("category", categoryId);
      form.append("name", "Tour Enquiry");
      form.append("email", "tour@enquiry.com");
      form.append("phone", "");

      form.append("ideaTitle", `Tour Enquiry - ${tourData.country}`);
      form.append(
        "ideaDescription",
        `Country: ${tourData.country}
        State: ${tourData.state}
        City: ${tourData.city}
        Tour Type: ${tourData.tourType}
        Start Date: ${tourData.startDate}
        End Date: ${tourData.endDate}
        Duration: ${tourData.duration}
        Travelers: ${tourData.travelers}
        Comments: ${tourData.comments}`
      );

      form.append("currentStatus", "Tour Request");
      form.append("innovate_location", tourData.city || "");

      if (tourData.attachment) {
        form.append("image", tourData.attachment);
      }

      const res = await dispatch(addEnquiry(form)).unwrap();

      if (res.success) {
        addToast("success", "Tour enquiry submitted successfully!", "success");
        // Reset form
        setTourData({
          country: "",
          state: "",
          city: "",
          tourType: "",
          startDate: "",
          endDate: "",
          duration: "",
          travelers: "",
          comments: "",
          attachment: null,
        });
        setAttachmentPreview(null);
      } else {
        addToast("error", "Something went wrong!", "error");
      }
    } catch (error) {
      console.log(error);
      addToast("error", "Failed to submit tour enquiry", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Country */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Country</label>
          <select
            value={tourData.country}
            onChange={(e) => setTourData({ ...tourData, country: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
          >
            <option value="">Select Country</option>
            <option value="Japan">Japan</option>
            <option value="India">India</option>
            <option value="Thailand">Thailand</option>
            <option value="USA">USA</option>
          </select>
        </div>

        {/* State */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">State</label>
          <select
            value={tourData.state}
            onChange={(e) => setTourData({ ...tourData, state: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
          >
            <option value="">Select state</option>
            <option value="California">California</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">City</label>
          <select
            value={tourData.city}
            onChange={(e) => setTourData({ ...tourData, city: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
          >
            <option value="">Select City</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangkok">Bangkok</option>
          </select>
        </div>

        {/* Tour Type */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Tour Type</label>
          <select
            value={tourData.tourType}
            onChange={(e) => setTourData({ ...tourData, tourType: e.target.value })}
            className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select type</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="beach">Beach</option>
            <option value="wildlife">Wildlife</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Start Date</label>
          <div className="relative">
            <input
              type="date"
              value={tourData.startDate}
              onChange={(e) => setTourData({ ...tourData, startDate: e.target.value })}
              className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">End Date</label>
          <div className="relative">
            <input
              type="date"
              value={tourData.endDate}
              onChange={(e) => setTourData({ ...tourData, endDate: e.target.value })}
              className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Duration</label>
          <select
            value={tourData.duration}
            onChange={(e) => setTourData({ ...tourData, duration: e.target.value })}
            className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select duration</option>
            <option value="3 days">3 days</option>
            <option value="5 days">5 days</option>
            <option value="7 days">7 days</option>
            <option value="10 days">10 days</option>
            <option value="14 days">14 days</option>
          </select>
        </div>

        {/* Travelers */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Travelers</label>
          <select
            value={tourData.travelers}
            onChange={(e) => setTourData({ ...tourData, travelers: e.target.value })}
            className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select travelers</option>
            <option value="1">1 Traveler</option>
            <option value="2">2 Travelers</option>
            <option value="3">3 Travelers</option>
            <option value="4">4 Travelers</option>
            <option value="5+">5+ Travelers</option>
          </select>
        </div>
      </div>

      {/* Add Attachment */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Add Attachment</label>
        <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer block">
          <Upload className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-sm text-gray-500">Click to upload</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAttachment}
          />
        </label>
        {attachmentPreview && (
          <img
            src={attachmentPreview}
            alt="preview"
            className="h-24 mt-2 rounded border"
          />
        )}
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Comments</label>
        <textarea
          value={tourData.comments}
          onChange={(e) => setTourData({ ...tourData, comments: e.target.value })}
          placeholder="Any special request or additional information..."
          className="w-full text-gray-500 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmitTourEnquiry}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Submit Enquiry
        </button>
      </div>
    </div>
  );
}