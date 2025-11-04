import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/MainCategorySlice"
import propertyReducer from "./slices/realestateProprtySlice"
import adminAuthReducer from "./slices/adminAuthSlice"
import carReducer from "./slices/carSlice"
import homeConsultingReducer from "./slices/homeConsultingSlice"
import testimonialsReducer from "./slices/TestimonialSlice"
import carouselReducer from "./slices/carouselSlice"
import tourPackageReducer from "./slices/tourPackageSlice"
import blogReducer from "./slices/blogSlice"

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        property: propertyReducer,
        adminAuth: adminAuthReducer,
        cars : carReducer,
        homeConsulting : homeConsultingReducer,
        testimonials : testimonialsReducer,
        carousels : carouselReducer,
        tourPackages : tourPackageReducer,
        blogs : blogReducer
    }
})