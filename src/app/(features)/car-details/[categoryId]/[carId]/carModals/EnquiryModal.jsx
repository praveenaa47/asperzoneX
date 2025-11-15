import React, { useState } from "react";
import { Mail, Phone, Calendar, MapPin, X } from "lucide-react";
import { addEnquiry } from "@/redux/slices/enquirySlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useToast } from "@/components/UserToast";


export default function SupportForm({ isOpen, onClose }) {
   const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.enquiries);
  const {addToast} = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    location: "",
  });
  const { categoryId } = useParams();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    category: categoryId,
    name: formData.firstName,
    email: formData.email,
    phone: formData.phone,
    location: formData.location,
  };

  try {
    const result = await dispatch(addEnquiry(payload)).unwrap();

    addToast('success','Car enquiry successfully added')
    onClose();

    // Reset form
    setFormData({
      firstName: "",
      email: "",
      phone: "",
      location: "",
    });

  } catch (err) {
    console.error("Enquiry failed:", err);
    addToast('error','Failed to add enquiry')
  }
};


    if (!isOpen) return null;


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
           {/* Modal Box */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          <X className="w-5 h-5" />
        </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="mb-8">
          <h1 className="text-lg sm:text-xl text-center font-bold text-gray-900 mb-2">
            Enquiry Now Get Support
          </h1>
          <p className="text-gray-600 text-center text-sm sm:text-base">
            We are here to help you. Please feel free to leave us a get back to
            you shortly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          

          {/* Email and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Email/User name
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-1" />
                Location
              </label>
              <input
                type="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                <Phone className="inline w-4 h-4 mr-1" />
                Phone Number / WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition duration-200 shadow-md hover:shadow-lg"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
