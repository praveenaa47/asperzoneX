import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/MainCategorySlice";
import propertyReducer from "./slices/realestateProprtySlice";
import adminAuthReducer from "./slices/adminAuthSlice";
import carReducer from "./slices/carSlice";
import homeConsultingReducer from "./slices/homeConsultingSlice";
import testimonialsReducer from "./slices/TestimonialSlice";
import carouselReducer from "./slices/carouselSlice";
import tourPackageReducer from "./slices/tourPackageSlice";
import blogReducer from "./slices/blogSlice";
import destinationReducer from "./slices/destinationSlice";
import courseReducer from "./slices/courseSlice";
import jobReducer from "./slices/jobSlice";
import wishlistReducer from "./slices/wishlistSlice";
import userAuthReducer from "./slices/UserAuthSlice";
import userProfileReducer from "./slices/profileSlice";
import adsReducer from "./slices/adsSlice";
import enquiryReducer from "./slices/enquirySlice";
import userSlice from "./slices/userSlice";
import overviewReducer from "./slices/overviewSlice";
import teamReducer from "./slices/TeamSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    property: propertyReducer,
    adminAuth: adminAuthReducer,
    cars: carReducer,
    homeConsulting: homeConsultingReducer,
    testimonials: testimonialsReducer,
    carousels: carouselReducer,
    tourPackages: tourPackageReducer,
    blogs: blogReducer,
    destinations: destinationReducer,
    courses: courseReducer,
    jobs: jobReducer,
    wishlist: wishlistReducer,
    userAuth : userAuthReducer,
    profile : userProfileReducer,
    ads : adsReducer,
    enquiries: enquiryReducer,
    users : userSlice,
    overview : overviewReducer,
    teams : teamReducer
  },
});
