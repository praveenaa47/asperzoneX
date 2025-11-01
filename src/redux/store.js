import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/MainCategorySlice"
import propertyReducer from "./slices/realestateProprtySlice"
import adminAuthReducer from "./slices/adminAuthSlice"
import carReducer from "./slices/carSlice"

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        property: propertyReducer,
        adminAuth: adminAuthReducer,
        cars : carReducer,
    }
})