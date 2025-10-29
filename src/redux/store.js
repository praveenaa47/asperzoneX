import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/MainCategorySlice"
import propertyReducer from "./slices/realestateProprtySlice"

export const store = configureStore({
    reducer:{
 category: categoryReducer, 
property: propertyReducer   }
})