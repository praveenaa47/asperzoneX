// FlightForm.jsx
"use client";
import { useState } from "react";
import { Upload, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/UserToast";
import { addEnquiry } from "@/redux/slices/enquirySlice";

export default function FlightForm({ categoryId }) {
  const [tripType, setTripType] = useState("roundtrip");
  const [flightData, setFlightData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    travelersCount: "",
    travelClass: "",
    message: "",
    attachment: null,
  });
  
  const [multiCityRoutes, setMultiCityRoutes] = useState([
    { from: "", to: "", departureDate: "", travelersCount: "", travelClass: "" }
  ]);
  
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFlightData({ ...flightData, attachment: file });
      const reader = new FileReader();
      reader.onloadend = () => setAttachmentPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleMultiCityChange = (index, field, value) => {
    const updatedRoutes = multiCityRoutes.map((route, i) => 
      i === index ? { ...route, [field]: value } : route
    );
    setMultiCityRoutes(updatedRoutes);
  };

  const addMultiCityRoute = () => {
    setMultiCityRoutes([
      ...multiCityRoutes,
      { from: "", to: "", departureDate: "", travelersCount: "", travelClass: "" }
    ]);
  };

  const removeMultiCityRoute = (index) => {
    if (multiCityRoutes.length > 1) {
      setMultiCityRoutes(multiCityRoutes.filter((_, i) => i !== index));
    }
  };

  const handleSubmitFlightEnquiry = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        addToast("error", "Please login first", "error");
        return;
      }

      const form = new FormData();
      
      // Required fields
      form.append("category", categoryId);
      form.append("flightType", tripType);
      form.append("name", "Flight Enquiry");
      form.append("email", "flight@enquiry.com");
      form.append("phone", "");

      if (tripType === "multicity") {
        // Multi-city specific fields
        multiCityRoutes.forEach((route, index) => {
          form.append(`multiCityRoutes[${index}][from]`, route.from || "");
          form.append(`multiCityRoutes[${index}][to]`, route.to || "");
          form.append(`multiCityRoutes[${index}][departureDate]`, route.departureDate || "");
          form.append(`multiCityRoutes[${index}][travelersCount]`, route.travelersCount || "");
          form.append(`multiCityRoutes[${index}][travelClass]`, route.travelClass || "");
        });
        
        form.append("message", flightData.message || "Multi-city flight enquiry");
      } else {
        // One-way and Round-trip fields
        form.append("from", flightData.from || "");
        form.append("to", flightData.to || "");
        form.append("departureDate", flightData.departureDate || "");
        form.append("travelersCount", flightData.travelersCount || "");
        form.append("travelClass", flightData.travelClass || "");
        form.append("message", flightData.message || `${tripType} flight enquiry`);
        
        if (tripType === "roundtrip") {
          form.append("returnDate", flightData.returnDate || "");
        }
      }

      // File attachment
      if (flightData.attachment) {
        form.append("attachments", flightData.attachment);
      }

      const res = await dispatch(addEnquiry(form)).unwrap();

      if (res.success) {
        addToast("success", "Flight enquiry submitted successfully!", "success");
        // Reset form
        setFlightData({
          from: "",
          to: "",
          departureDate: "",
          returnDate: "",
          travelersCount: "",
          travelClass: "",
          message: "",
          attachment: null,
        });
        setMultiCityRoutes([
          { from: "", to: "", departureDate: "", travelersCount: "", travelClass: "" }
        ]);
        setAttachmentPreview(null);
      } else {
        addToast("error", "Something went wrong!", "error");
      }
    } catch (error) {
      console.log(error);
      addToast("error", "Failed to submit flight enquiry", "error");
    }
  };

  const renderOneWayRoundTripForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* From */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">From *</label>
          <input
            type="text"
            value={flightData.from}
            onChange={(e) => setFlightData({ ...flightData, from: e.target.value })}
            placeholder="City or airport (e.g., New York JFK)"
            className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">To *</label>
          <input
            type="text"
            value={flightData.to}
            onChange={(e) => setFlightData({ ...flightData, to: e.target.value })}
            placeholder="City or airport (e.g., London LHR)"
            className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Departure Date */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Departure Date *</label>
          <input
            type="date"
            value={flightData.departureDate}
            onChange={(e) => setFlightData({ ...flightData, departureDate: e.target.value })}
            className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Return Date - Only for round trip */}
        {tripType === "roundtrip" && (
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Return Date *</label>
            <input
              type="date"
              value={flightData.returnDate}
              onChange={(e) => setFlightData({ ...flightData, returnDate: e.target.value })}
              className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
      </div>
    </>
  );

  const renderMultiCityForm = () => (
    <div className="space-y-4">
      {multiCityRoutes.map((route, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
          {multiCityRoutes.length > 1 && (
            <button
              type="button"
              onClick={() => removeMultiCityRoute(index)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          )}
          
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Flight {index + 1}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">From *</label>
              <input
                type="text"
                value={route.from}
                onChange={(e) => handleMultiCityChange(index, "from", e.target.value)}
                placeholder="City or airport"
                className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">To *</label>
              <input
                type="text"
                value={route.to}
                onChange={(e) => handleMultiCityChange(index, "to", e.target.value)}
                placeholder="City or airport"
                className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Departure Date *</label>
              <input
                type="date"
                value={route.departureDate}
                onChange={(e) => handleMultiCityChange(index, "departureDate", e.target.value)}
                className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600">Travelers *</label>
              <select
                value={route.travelersCount}
                onChange={(e) => handleMultiCityChange(index, "travelersCount", e.target.value)}
                className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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

          <div className="mt-3">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Class *</label>
              <select
                value={route.travelClass}
                onChange={(e) => handleMultiCityChange(index, "travelClass", e.target.value)}
                className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select class</option>
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addMultiCityRoute}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <Plus size={16} />
        Add Another Flight
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Trip Type Selection */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer text-black">
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={(e) => setTripType(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm">One Way</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-black">
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={tripType === "roundtrip"}
            onChange={(e) => setTripType(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm">Round Trip</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-black">
          <input
            type="radio"
            name="tripType"
            value="multicity"
            checked={tripType === "multicity"}
            onChange={(e) => setTripType(e.target.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm">Multi City</span>
        </label>
      </div>

      <div className="text-sm text-gray-600 text-right">
        Book International and Domestic Flights
      </div>

      {/* Flight Details */}
      {tripType === "multicity" ? renderMultiCityForm() : renderOneWayRoundTripForm()}

      {/* Travelers & Class - Only for one-way and round-trip */}
      {tripType !== "multicity" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Travelers *</label>
            <select
              value={flightData.travelersCount}
              onChange={(e) => setFlightData({ ...flightData, travelersCount: e.target.value })}
              className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select travelers</option>
              <option value="1">1 Traveler</option>
              <option value="2">2 Travelers</option>
              <option value="3">3 Travelers</option>
              <option value="4">4 Travelers</option>
              <option value="5+">5+ Travelers</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">Class *</label>
            <select
              value={flightData.travelClass}
              onChange={(e) => setFlightData({ ...flightData, travelClass: e.target.value })}
              className="w-full border text-gray-500 border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select class</option>
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Message</label>
        <textarea
          value={flightData.message}
          onChange={(e) => setFlightData({ ...flightData, message: e.target.value })}
          placeholder="Any special requests or additional information..."
          className="w-full border text-gray-500 border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
        />
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

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmitFlightEnquiry}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Submit Flight Enquiry
        </button>
      </div>
    </div>
  );
}