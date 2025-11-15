"use client";
import { useState } from "react";
import { User, Mail, Phone, ChevronDown, Calendar, Upload } from "lucide-react";
import { addEnquiry } from "@/redux/slices/enquirySlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useToast } from "@/components/UserToast";

export default function ConsultingForm() {
  const dispatch = useDispatch();
  // const {id} = useParams();
  const { addToast } = useToast();
  const params = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    studentsLocation: "",
    startDate: "",
    termsAccepted: false,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      addToast("error", "Please accept the condition");
      return;
    }

    const formPayload = new FormData();

    formPayload.append("category", params?.id);
    formPayload.append("name", `${formData.firstName} ${formData.lastName}`);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);

    formPayload.append("student_location", formData.studentsLocation || "");
    formPayload.append("course_interested", formData.courseInterested || "");
    formPayload.append("nationality", formData.nationality || "");
    formPayload.append("qualification", formData.higherQualification || "");
    formPayload.append("starting", formData.startDate || "");
    formPayload.append("heard_from", formData.hearAbout || "");

    // image file
    if (imageFile) {
      formPayload.append("image", imageFile);
    }

    try {
      const result = await dispatch(addEnquiry(formPayload)).unwrap();

      if (result.success) {
        addToast(
          "success",
          "Thank you for your enquiry! We will get back to you shortly."
        );
      } else {
        addToast("error", result.message || "Something went wrong");
      }
    } catch (error) {
      addToast("error", "Failed to submit enquiry");
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-2">
            Enquiry Now Get Support
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            we are here to help you. fill out the form below & we'll get back to
            you shortly
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <div className="relative border border-blue-300 rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full text-black pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative border border-blue-300 rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@mail.com"
                  className="w-full text-black pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <div className="relative border border-blue-300 rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="126555"
                className="w-full text-black pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="studentsLocation"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="studentsLocation"
                  name="studentsLocation"
                  value={formData.studentsLocation}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                When do you plan to start?
              </label>
              <div className="relative">
                <select
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 3 Months">Within 3 Months</option>
                  <option value="Within 6 Months">Within 6 Months</option>
                  <option value="Next Year">Next Year</option>
                </select>

                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Image (optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-48 rounded-lg"
                    />
                    <p className="text-sm text-blue-600">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Drag & Drop here</p>
                      <p className="text-xs text-gray-500">
                        or click to upload
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-3 py-3">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="termsAccepted"
              className="text-xs sm:text-sm text-black leading-relaxed"
            >
              I accept the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Condition
              </a>
              . By submitting this form, I consent to receive relevant
              communications via email, phone, or text from Aspire Zones X and
              its partners. I understand that my information will not be shared
              across Aspire Zones X Group and that I can opt out at any time by
              using the unsubscribe link provided in all communications.
              <br />
              <span className="block mt-1">
                The information I provide will be processed in accordance with
                Aspire Zones X{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  privacy policy
                </a>
                .
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              className="px-10 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 shadow-md"
            >
              Submit Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
