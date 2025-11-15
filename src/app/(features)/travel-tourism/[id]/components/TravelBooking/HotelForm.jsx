"use client";
import { useState } from "react";
import { Calendar, Upload } from "lucide-react";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/UserToast";
import { addEnquiry } from "@/redux/slices/enquirySlice";

export default function HotelForm({ categoryId }) {
  const [hotelData, setHotelData] = useState({
    destination: "",
    location: "",
    propertyType: "",
    starRating: "",
    hotelName: "",
    budget: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    rooms: "",
    comments: "",
    attachment: null,
  });
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHotelData({ ...hotelData, attachment: file });
      const reader = new FileReader();
      reader.onloadend = () => setAttachmentPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitHotelEnquiry = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        addToast("error", "Please login first", "error");
        return;
      }

      const form = new FormData();
      form.append("category", categoryId);
      form.append("name", "Hotel Enquiry");
      form.append("email", "hotel@enquiry.com");
      form.append("phone", "");
      form.append("message", hotelData.comments || "Hotel booking enquiry");

      form.append("destination", hotelData.destination || "");
      form.append("hotel_location", hotelData.location || "");
      form.append("propertyType", hotelData.propertyType || "");
      form.append("starRating", hotelData.starRating || "");
      form.append("hotelName", hotelData.hotelName || "");
      form.append("budget", hotelData.budget || "");
      form.append("checkInDate", hotelData.checkIn || "");
      form.append("checkOutDate", hotelData.checkOut || "");
      form.append("guests", hotelData.guests || "");
      form.append("rooms", hotelData.rooms || "");

      if (hotelData.attachment) {
        form.append("attachments", hotelData.attachment);
      }

      const res = await dispatch(addEnquiry(form)).unwrap();

      if (res.success) {
        addToast("success", "Hotel enquiry submitted successfully!", "success");
        // Reset form
        setHotelData({
          destination: "",
          location: "",
          propertyType: "",
          starRating: "",
          hotelName: "",
          budget: "",
          checkIn: "",
          checkOut: "",
          guests: "",
          rooms: "",
          comments: "",
          attachment: null,
        });
        setAttachmentPreview(null);
      } else {
        addToast("error", "Something went wrong!", "error");
      }
    } catch (error) {
      console.log(error);
      addToast("error", "Failed to submit hotel enquiry", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Destination</label>
          <select
            value={hotelData.destination}
            onChange={(e) => setHotelData({ ...hotelData, destination: e.target.value })}
            className="w-full border text-gray-500 px-4 py-3 rounded-lg"
          >
            <option value="">Select Country</option>
            <option value="Bali, Indonesia">Bali, Indonesia</option>
            <option value="Japan">Japan</option>
            <option value="Thailand">Thailand</option>
            <option value="USA">USA</option>
          </select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Location</label>
          <select
            value={hotelData.location}
            onChange={(e) => setHotelData({ ...hotelData, location: e.target.value })}
            className="w-full border text-gray-500 px-4 py-3 rounded-lg"
          >
            <option value="">Select Location</option>
            <option value="Seminyak">Seminyak</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Bangkok">Bangkok</option>
            <option value="New York">New York</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Property Type</label>
          <select
            value={hotelData.propertyType}
            onChange={(e) => setHotelData({ ...hotelData, propertyType: e.target.value })}
            className="w-full border text-gray-500 px-4 py-3 rounded-lg"
          >
            <option value="">Select type</option>
            <option value="hotel">Hotel</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="resort">Resort</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Star Rating */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Star Rating</label>
          <select
            value={hotelData.starRating}
            onChange={(e) => setHotelData({ ...hotelData, starRating: e.target.value })}
            className="w-full border text-gray-500 px-4 py-3 rounded-lg"
          >
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        {/* Hotel/Property Name */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Hotel/Property Name</label>
          <input
            type="text"
            value={hotelData.hotelName}
            onChange={(e) => setHotelData({ ...hotelData, hotelName: e.target.value })}
            placeholder="Enter Hotel/Property Name"
            className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Budget (per night)</label>
          <select
            value={hotelData.budget}
            onChange={(e) => setHotelData({ ...hotelData, budget: e.target.value })}
            className="w-full border text-gray-500 px-4 py-3 rounded-lg"
          >
            <option value="">Select budget</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="500+">$500+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Check In */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Check In</label>
          <div className="relative">
            <input
              type="date"
              value={hotelData.checkIn}
              onChange={(e) => setHotelData({ ...hotelData, checkIn: e.target.value })}
              className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Check Out</label>
          <div className="relative">
            <input
              type="date"
              value={hotelData.checkOut}
              onChange={(e) => setHotelData({ ...hotelData, checkOut: e.target.value })}
              className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Rooms */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Rooms</label>
          <select
            value={hotelData.rooms}
            onChange={(e) => setHotelData({ ...hotelData, rooms: e.target.value })}
            className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select rooms</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
            <option value="4">4 Rooms</option>
            <option value="5+">5+ Rooms</option>
          </select>
        </div>
      </div>

      {/* Guests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Guests</label>
          <select
            value={hotelData.guests}
            onChange={(e) => setHotelData({ ...hotelData, guests: e.target.value })}
            className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select guests</option>
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5+">5+ Guests</option>
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
          value={hotelData.comments}
          onChange={(e) => setHotelData({ ...hotelData, comments: e.target.value })}
          rows="4"
          className="w-full border-gray-300 text-gray-500 rounded-lg p-3"
          placeholder="Additional notes..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmitHotelEnquiry}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Enquiry
        </button>
      </div>
    </div>
  );
}