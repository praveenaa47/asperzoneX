import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseUrl";
import axios from "axios";

export const getEstateproperty = createAsyncThunk(
  "property/getEstateproperty",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/properties`);
      console.log(response);
      
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "failed to get response");
    }
  }
);

export const getEstatepropertybyId = createAsyncThunk(
  "property/getEstatepropertybyId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/properties/${id}`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "failed to get response");
    }
  }
);

const realestatePropertSlice = createSlice({
  name: "property",
  initialState: {
    data: [],        
    singleProperty: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all properties
      .addCase(getEstateproperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEstateproperty.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; 
      })
      .addCase(getEstateproperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get property by ID
      .addCase(getEstatepropertybyId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEstatepropertybyId.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProperty = action.payload; 
      })
      .addCase(getEstatepropertybyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default realestatePropertSlice.reducer;