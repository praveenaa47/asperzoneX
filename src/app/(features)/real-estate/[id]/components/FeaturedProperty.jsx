"use client";
import { useEffect, useState } from "react";
import { Heart, MapPin, Bed, Bath, Maximize, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getEstateproperty } from "@/redux/slices/realestateProprtySlice";
import { useParams, useRouter } from "next/navigation";
import {
  AddtoWishlist,
  getWishlist,
  removeWishlist,
} from "@/redux/slices/wishlistSlice";
import { useToast } from "@/components/UserToast";

export default function FeaturedProperties() {
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.property);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const router = useRouter();
  const { addToast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEstateproperty());
  }, [dispatch]);

  useEffect(() => {
    if (wishlistItems?.length > 0) {
      const ids = wishlistItems.map((item) => item.itemId?._id || item.itemId);
      setFavorites(ids);
    }
  }, [wishlistItems]);

  const featuredProperties =
    data?.filter((item) => item.isFeatured === true) || [];

  const toggleFavorite = async (propertyId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      addToast("error", "Please log in to manage your wishlist.");
      return;
    }
    const isFavorite = favorites.includes(propertyId);

    if (isFavorite) {
      // remove from wishlist
      await dispatch(removeWishlist(propertyId));
      setFavorites((prev) => prev.filter((id) => id !== propertyId));
      addToast("success", "Removed from wishlist...❌");
    } else {
      // add to wishlist
      const payload = {
        itemId: propertyId,
        itemType: "Property",
      };
      await dispatch(AddtoWishlist(payload));
      setFavorites((prev) => [...prev, propertyId]);
      addToast("success", "Added to wishlist...✅");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Loading featured properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (featuredProperties.length === 0) {
    return (
      <section className="py-12 px-6 sm:px-8 lg:px-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Featured Properties
        </h2>
        <p className="text-gray-500">No featured properties found.</p>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-5 sm:mb-6">
        Featured Properties
      </h2>

      {}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 max-w-7xl mx-auto">
        {featuredProperties.map((property) => (
          <div
            key={property.id}
            onClick={() =>
  router.push(`/realestate-details/${id}/${property._id}`)
}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            {}
            <div className="relative h-36 sm:h-44 md:h-48">
              <img
                src={property.images?.[0] || "/default-property.jpg"}
                alt={property.propertyName}
                className="w-full h-full object-cover"
              />

              {property.forSale && (
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gray-800 text-white text-[10px] sm:text-[11px] px-2 py-1 rounded">
                  For Sale
                </span>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(property._id);
                }}
                className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                  favorites.includes(property._id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                    favorites.includes(property._id) ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>

            {}
            <div className="p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                {property.propertyName}
              </h3>

              <div className="flex items-center text-gray-600 text-[10px] sm:text-xs mb-2 sm:mb-3">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{property.location?.formatted}</span>
              </div>

              <div className="flex items-center gap-2 mb-2 sm:mb-3 text-[10px] sm:text-xs">
                <span className="bg-blue-100 text-blue-700 font-medium px-2 sm:px-3 py-1 rounded-full">
                  {property.propertyType}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3 border-b pb-2 sm:pb-3">
                <div className="flex items-center">
                  <Bed className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1" />
                  <span className="hidden sm:inline">
                    {property.bedrooms} Beds
                  </span>
                  <span className="sm:hidden">{property.bedrooms}</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1" />
                  <span className="hidden sm:inline">
                    {property.bathrooms} Baths
                  </span>
                  <span className="sm:hidden">{property.bathrooms}</span>
                </div>
                <div className="flex items-center">
                  <Maximize className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-0.5 sm:mr-1" />
                  <span className="hidden sm:inline">
                    {property.area?.value} {property.area?.unit}
                  </span>
                  <span className="sm:hidden">{property.area?.value}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm sm:text-base font-bold text-blue-600">
                  {property.price?.amount
                    ? `AED ${property.price.amount.toLocaleString()}`
                    : "N/A"}
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-500">
                  {new Date(property.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-800 text-gray-800 font-semibold rounded-md hover:bg-gray-800 hover:text-white transition-colors text-sm sm:text-base">
          View all
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </section>
  );
}
