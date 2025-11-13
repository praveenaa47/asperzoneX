import React from "react";

const AdditionalFeaturesSection = ({ formData, updateArrayField }) => {
  const additionalFeaturesList = [
    "Sunroof",
    "Apple CarPlay",
    "Android Auto",
    "360 Camera",
    "Premium Sound",
    "Cruise Control",
    "Keyless Entry",
    "Blind Spot Detection",
    "Wireless Charger",
    "Heated Seats",
    "Ventilated Seats",
    "Heads-Up Display",
  ];

  return (
    <div className="bg-[#F6F6F6] rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Additional Features
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {additionalFeaturesList.map((feature) => (
          <label key={feature} className="flex items-center">
            <input
              type="checkbox"
              checked={formData.additionalFeatures.includes(feature)}
              onChange={(e) =>
                updateArrayField(
                  "additionalFeatures",
                  feature,
                  e.target.checked
                )
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
            />
            <span className="text-sm text-gray-700">{feature}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AdditionalFeaturesSection;
