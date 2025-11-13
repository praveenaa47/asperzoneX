"use client";
import AspireZonesFooter from "@/components/Footer";
import Header from "@/components/home/Header";
import React, { useState } from "react";
import BasicInfoSection from "./components/BasicInfoSection";
import CarDetailsSection from "./components/CarDetailsSection";
import TechnicalSpecsSection from "./components/TechnicalSpecsSection";
import AdditionalDetailsSection from "./components/AdditionalDetailsSection";
import InsuranceSection from "./components/InsuranceSection";
import PriceSection from "./components/PriceSection";
import LocationSection from "./components/LocationSection";
import FeaturesSection from "./components/FeaturesSection";
import AdditionalFeaturesSection from "./components/AdditionalFeaturesSection";
import TagsSection from "./components/TagsSection";
import ImagesSection from "./components/ImagesSection";
import CarSection from "./components/CarSection";
import { useDispatch } from "react-redux";
import { addUserCar } from "@/redux/slices/carSlice";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/UserToast";

export default function SellForm() {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const router = useRouter();
  

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    fuelType: "",
    transmission: "",
    condition: "used",
    bodyType: "",
    mileage: "",
    engineCapacity: "",
    power: "",
    registrationYear: "",
    registrationNumber: "",
    insuranceValidUntil: "",
    insuranceType: "comprehensive",
    spareKeyAvailable: false,
    price: {
      amount: "",
      unit: "total",
      isNegotiable: false,
      rcTransferPrice: "",
      carServicingCharges: "",
    },
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
    },
    kmsDriven: "",
    color: "",
    seatingCapacity: "",
    ownerType: "",
    features: [],
    additionalFeatures: [],
    tags: [],
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const updateFormData = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const updateArrayField = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleImageChange = (files) => {
    if (files.length + imagePreviews.length > 10) {
      setErrors((prev) => ({ ...prev, images: "Maximum 10 images allowed" }));
      return;
    }

    const newImagePreviews = [];
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

    files.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          images: "Please select valid image files (JPEG, PNG, GIF)",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          images: "Image size should be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setImagePreviews((prev) => [...prev, ...newImagePreviews]);
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
          }));
          setErrors((prev) => ({ ...prev, images: "" }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = formData.images.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.brand) newErrors.brand = "Brand is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.fuelType) newErrors.fuelType = "Fuel type is required";
    if (!formData.transmission)
      newErrors.transmission = "Transmission is required";
    if (!formData.kmsDriven)
      newErrors.kmsDriven = "Kilometers driven is required";
    if (!formData.color) newErrors.color = "Color is required";
    if (!formData.seatingCapacity)
      newErrors.seatingCapacity = "Seating capacity is required";
    if (!formData.ownerType) newErrors.ownerType = "Owner type is required";
    if (!formData.price.amount) newErrors["price.amount"] = "Price is required";
    if (!formData.location.city)
      newErrors["location.city"] = "City is required";
    if (!formData.location.state)
      newErrors["location.state"] = "State is required";
    if (!formData.location.country)
      newErrors["location.country"] = "Country is required";

    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast("error", "Please fill all required fields ❌");
      return;
    }

    try {
      setLoading(true);

      const submitFormData = new FormData();

      submitFormData.append("title", formData.title);
      submitFormData.append("description", formData.description);
      submitFormData.append("category", formData.category);
      submitFormData.append("brand", formData.brand);
      submitFormData.append("model", formData.model);
      submitFormData.append("year", formData.year.toString());
      submitFormData.append("fuelType", formData.fuelType);
      submitFormData.append("transmission", formData.transmission);
      submitFormData.append("kmsDriven", formData.kmsDriven.toString());
      submitFormData.append("color", formData.color);
      submitFormData.append(
        "seatingCapacity",
        formData.seatingCapacity.toString()
      );
      submitFormData.append("ownerType", formData.ownerType);

      submitFormData.append("condition", formData.condition);
      submitFormData.append("bodyType", formData.bodyType);
      submitFormData.append("mileage", formData.mileage.toString());
      submitFormData.append("engineCapacity", formData.engineCapacity);
      submitFormData.append("power", formData.power);
      submitFormData.append("registrationYear", formData.registrationYear);
      submitFormData.append("registrationNumber", formData.registrationNumber);
      submitFormData.append(
        "insuranceValidUntil",
        formData.insuranceValidUntil
      );
      submitFormData.append("insuranceType", formData.insuranceType);
      submitFormData.append(
        "spareKeyAvailable",
        formData.spareKeyAvailable.toString()
      );

      submitFormData.append(
        "price[basePrice]",
        formData.price.amount.toString()
      );
      submitFormData.append(
        "price[totalPrice]",
        formData.price.amount.toString()
      );
      submitFormData.append(
        "price[rcTransferPrice]",
        formData.price.rcTransferPrice?.toString() || "0"
      );
      submitFormData.append(
        "price[carServicingCharges]",
        formData.price.carServicingCharges?.toString() || "0"
      );
      submitFormData.append("price[currency]", "INR");
      submitFormData.append(
        "price[isNegotiable]",
        formData.price.isNegotiable.toString()
      );

      submitFormData.append("location[city]", formData.location.city);
      submitFormData.append("location[country]", formData.location.country);
      submitFormData.append("location[state]", formData.location.state);
      submitFormData.append("location[address]", formData.location.address);

      formData.features.forEach((feature, index) => {
        submitFormData.append(`features[${index}]`, feature);
      });

      formData.additionalFeatures?.forEach((feature, index) => {
        submitFormData.append(`additionalFeatures[${index}]`, feature);
      });

      formData.tags?.forEach((tag, index) => {
        submitFormData.append(`tags[${index}]`, tag);
      });

      formData.images.forEach((image) => {
        if (image instanceof File) {
          submitFormData.append("media", image);
        }
      });

      submitFormData.append(
        "passengerCapacity",
        formData.seatingCapacity.toString()
      );

      await dispatch(addUserCar(submitFormData)).unwrap();

      addToast(
        "success",
        "Car listed successfully! It will be visible after approval ✅"
      );
    } catch (error) {
      console.error("Failed to list car:", error);
      addToast("error", "Failed to list car. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <CarSection />
      <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">

          <BasicInfoSection
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <CarDetailsSection
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <TechnicalSpecsSection
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <AdditionalDetailsSection
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <InsuranceSection
            formData={formData}
            updateFormData={updateFormData}
          />

          <PriceSection
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <LocationSection
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />

          <FeaturesSection
            formData={formData}
            updateArrayField={updateArrayField}
          />

          <AdditionalFeaturesSection
            formData={formData}
            updateArrayField={updateArrayField}
          />

          <TagsSection formData={formData} updateFormData={updateFormData} />

          <ImagesSection
            imagePreviews={imagePreviews}
            errors={errors}
            handleImageChange={handleImageChange}
            handleRemoveImage={handleRemoveImage}
          />

          <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Listing Your Car...
                </div>
              ) : (
                "Sell My Car"
              )}
            </button>
          </div>
        </form>
      </div>
      <AspireZonesFooter />
    </div>
  );
}
