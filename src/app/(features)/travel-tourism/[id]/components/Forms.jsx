"use client";
import { useState } from "react";
import {
  Plane,
  MapPin,
  Building2,
  Calendar,
  Users,
  Upload,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/UserToast";
import { useParams } from "next/navigation";
import { addEnquiry } from "@/redux/slices/enquirySlice";

export default function TravelBookingTabs() {
  const [activeTab, setActiveTab] = useState("flights");
  const [tripType, setTripType] = useState("roundTrip");
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const [attachmentPreview, setAttachmentPreview] = useState(null);

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

  const handleTourAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTourData({ ...tourData, attachment: file });

      const reader = new FileReader();
      reader.onloadend = () => setAttachmentPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const { id: categoryId } = useParams();

  const tabs = [
    { id: "flights", label: "Flights", icon: Plane },
    { id: "tours", label: "Tours", icon: MapPin },
    { id: "hotels", label: "Hotels", icon: Building2 },
  ];

  const handleSubmitTourEnquiry = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        addToast("error", "Please login first", "error");
        return;
      }

      const form = new FormData();

      // Required by backend
      form.append("category", categoryId); // dynamic from innovate/[id]
      form.append("name", "Tour Enquiry"); // you can replace dynamically
      form.append("email", "tour@ enquiry.com"); // if you have user email
      form.append("phone", ""); // optional

      // Map tour form to backend fields
      form.append("ideaTitle", `Tour Enquiry - ${tourData.country}`);
      form.append(
        "ideaDescription",
        `
      Country: ${tourData.country}
      State: ${tourData.state}
      City: ${tourData.city}
      Tour Type: ${tourData.tourType}
      Start Date: ${tourData.startDate}
      End Date: ${tourData.endDate}
      Duration: ${tourData.duration}
      Travelers: ${tourData.travelers}
      Comments: ${tourData.comments}
    `
      );

      form.append("currentStatus", "Tour Request");
      form.append("innovate_location", tourData.city || "");
      form.append("videoLink", "");
      form.append("referenceLink", "");

      if (tourData.attachment) {
        form.append("image", tourData.attachment);
      }

      const res = await dispatch(addEnquiry(form)).unwrap();

      if (res.success) {
        addToast("success", "Tour enquiry submitted successfully!", "success");
      } else {
        addToast("error", "Something went wrong!", "error");
      }
    } catch (error) {
      console.log(error);
      addToast("error", "Failed to submit tour enquiry", "error");
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

      // Required global fields for ALL enquiries
      form.append("category", categoryId);
      form.append("name", "Hotel Enquiry");
      form.append("email", "hotel@enquiry.com");
      form.append("phone", "");

      // Backend message field (short text)
      form.append("message", hotelData.comments || "Hotel booking enquiry");

      // Map hotel form fields to backend keys
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

      // Optional file upload
      if (hotelData.attachment) {
        form.append("attachments", hotelData.attachment);
      }

      const res = await dispatch(addEnquiry(form)).unwrap();

      if (res.success) {
        addToast("success", "Hotel enquiry submitted successfully!", "success");
      } else {
        addToast("error", "Something went wrong!", "error");
      }
    } catch (error) {
      console.log(error);
      addToast("error", "Failed to submit hotel enquiry", "error");
    }
  };

  return (
    <div className="">
      <div className="max-w-6xl mx-auto bg-white border border-blue-400 rounded-lg shadow-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "flights" && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneWay"
                    checked={tripType === "oneWay"}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">One Way</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="roundTrip"
                    checked={tripType === "roundTrip"}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Round Trip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-black">
                  <input
                    type="radio"
                    name="tripType"
                    value="multiCity"
                    checked={tripType === "multiCity"}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm">Multi City</span>
                </label>
              </div>

              <div className="text-sm text-gray-600 text-right">
                Book International and Domestic Flights
              </div>

              {/* Flight Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* From */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">From</label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">
                      Mumbai
                    </div>
                    <div className="text-xs text-gray-500">
                      BOM, Chhatrapati Shivaji International Airport India
                    </div>
                  </div>
                </div>

                {/* To */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">To</label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">
                      Delhi
                    </div>
                    <div className="text-xs text-gray-500">
                      DEL, Indira Gandhi International Airp
                    </div>
                  </div>
                </div>

                {/* Departure */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 flex items-center gap-1">
                    Departure <span className="text-gray-400">▼</span>
                  </label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">
                      1 Dec' 25
                    </div>
                    <div className="text-xs text-gray-500">Monday</div>
                  </div>
                </div>

                {/* Return */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 flex items-center gap-1">
                    Return <span className="text-gray-400">▼</span>
                  </label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">
                      12 Dec' 25
                    </div>
                    <div className="text-xs text-gray-500">Monday</div>
                  </div>
                </div>
              </div>

              {/* Travelers & Class */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 flex items-center gap-1">
                    Travelers & Class <span className="text-gray-400">▼</span>
                  </label>
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-black">
                      1 Traveler
                    </div>
                    <div className="text-xs text-gray-500">
                      Economy/Premium Economy
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Attachment */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Add Attachment
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500">
                    Drag & drop image here or click to upload
                  </p>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Comments
                </label>
                <textarea
                  placeholder="Any special request or additional information..."
                  className="w-full border text-gray-500 border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Submit Enquiry
                </button>
              </div>
            </div>
          )}

          {/* Tours Tab */}
          {activeTab === "tours" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Country */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">country</label>
                  <select
                    value={tourData.country}
                    onChange={(e) =>
                      setTourData({ ...tourData, country: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
                  >
                    <option value="">Select Country</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                  </select>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">State</label>
                  <select
                    value={tourData.state}
                    onChange={(e) =>
                      setTourData({ ...tourData, state: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
                  >
                    <option value="">Select state</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                  </select>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">city</label>
                  <select
                    value={tourData.city}
                    onChange={(e) =>
                      setTourData({ ...tourData, city: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500"
                  >
                    <option value="">Select Country</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                  </select>
                </div>

                {/* Tour Type */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Tour Type</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Adventure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Start Date */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Start Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select a start date"
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
                      type="text"
                      placeholder="Select a end date"
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
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select duration</option>
                  </select>
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Travelers</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Travelers</option>
                  </select>
                </div>
              </div>

              {/* Add Attachment */}
              <div className="space-y-2">
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer block">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500">Click to upload</p>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleTourAttachment}
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
                <label className="text-sm font-medium text-gray-700">
                  Comments
                </label>
                <textarea
                  placeholder="Any special request or additional information..."
                  className="w-full text-gray-500 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleSubmitTourEnquiry}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hotels Tab */}
          {activeTab === "hotels" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Destination */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Destination</label>
                  <select
                    value={hotelData.destination}
                    onChange={(e) =>
                      setHotelData({
                        ...hotelData,
                        destination: e.target.value,
                      })
                    }
                    className="w-full border text-gray-500 px-4 py-3 rounded-lg"
                  >
                    <option value="">Select Country</option>
                    <option value="Bali, Indonesia">Bali, Indonesia</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Location</label>
                  <select
                    value={hotelData.location}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, location: e.target.value })
                    }
                    className="w-full border text-gray-500 px-4 py-3 rounded-lg"
                  >
                    <option value="">Select Location</option>
                    <option value="Seminyak">Seminyak</option>
                    <option value="Tokyo">Tokyo</option>
                  </select>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Property Type</label>
                  <select
                    value={hotelData.propertyType}
                    onChange={(e) =>
                      setHotelData({
                        ...hotelData,
                        propertyType: e.target.value,
                      })
                    }
                    className="w-full border text-gray-500 px-4 py-3 rounded-lg"
                  >
                    <option value="">Select type</option>
                    <option value="villa">villa</option>
                    <option value="apartment">apartment</option>
                  </select>{" "}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Star Rating */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Star Rating</label>
                  <select
                    value={hotelData.starRating}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, starRating: e.target.value })
                    }
                    className="w-full border text-gray-500 px-4 py-3 rounded-lg"
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>{" "}
                </div>

                {/* Hotel/Property Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">
                    Hotel/Property Name
                  </label>
                  <input
                    type="text"
                    value="hotelName"
                    placeholder="Enter Hotel/Property Name"
                    className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Budget */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Budget</label>
                  <select
                    value={hotelData.budget}
                    onChange={(e) =>
                      setHotelData({ ...hotelData, budget: e.target.value })
                    }
                    className="w-full border text-gray-500 px-4 py-3 rounded-lg"
                  >
                    <option value="">Select budget</option>
                    <option value="2000">2000</option>
                    <option value="40000">40000</option>
                  </select>{" "}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Check In */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Check In</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select a Check In date"
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
                      type="text"
                      placeholder="Select a Check Out date"
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
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Guests</label>
                  <select className="w-full text-gray-500 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1 </option>
                    <option>2 </option>
                    <option>3 </option>
                  </select>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Comments
                </label>
                <textarea
                  value={tourData.comments}
                  onChange={(e) =>
                    setTourData({ ...tourData, comments: e.target.value })
                  }
                  rows="4"
                  className="w-full border-gray-300 text-gray-500 rounded-lg p-3"
                  placeholder="Additional notes..."
                ></textarea>
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
          )}
        </div>
      </div>
    </div>
  );
}
