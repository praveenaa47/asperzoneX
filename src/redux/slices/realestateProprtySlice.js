import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseUrl";
import axios from "axios";

export const getEstateproperty = createAsyncThunk(
  "property/getEstateproperty",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/properties`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch properties");
    }
  }
);
export const getEstatepropertyById = createAsyncThunk(
  "property/getEstatepropertyById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/properties/user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch property");
    }
  }
);
export const addEstateproperty = createAsyncThunk(
  "property/addEstateproperty",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${BASE_URL}/properties`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add property");
    }
  }
);

// user
export const addUserEstateproperty = createAsyncThunk(
  "property/addUserEstateproperty",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${BASE_URL}/properties/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add property");
    }
  }
);

export const updateEstateproperty = createAsyncThunk(
  "property/updateEstateproperty",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/properties/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update property");
    }
  }
);

export const deleteEstateproperty = createAsyncThunk(
  "property/deleteEstateproperty",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete property");
    }
  }
);

const realestatePropertSlice = createSlice({
  name: "property",
  initialState: {
    data: [],
    selectedProperty: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEstateproperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEstateproperty.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getEstateproperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEstatepropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload.data;
      })
      .addCase(addEstateproperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEstateproperty.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.data.push(action.payload.data);
        }
      })
      .addCase(addEstateproperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // user
      .addCase(addUserEstateproperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserEstateproperty.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.data.push(action.payload.data);
        }
      })
      .addCase(addUserEstateproperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateEstateproperty.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.data.findIndex(
            (item) => item._id === action.payload.data._id
          );
          if (index !== -1) {
            state.data[index] = action.payload.data;
          }
        }
      })
      .addCase(deleteEstateproperty.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (item) => item._id !== action.payload.id
        );
      });
  },
});
export default realestatePropertSlice.reducer;







