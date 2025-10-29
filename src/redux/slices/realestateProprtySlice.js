import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseUrl";
import axios from "axios";

export const getEstateproperty = createAsyncThunk(
  "property/getEstateproperty",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/properties`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "faield to get response");
    }
  }
);

const realestatePropertSlice = createSlice({
  name: "property",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default realestatePropertSlice.reducer;
