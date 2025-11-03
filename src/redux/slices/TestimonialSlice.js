import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getAllTestimonials = createAsyncThunk(
  "testimonials/getAllTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/testimonials`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load testimonials");
    }
  }
);

export const getTestimonialById = createAsyncThunk(
  "testimonials/getTestimonialById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/testimonials/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch testimonial");
    }
  }
);

export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${BASE_URL}/testimonials`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add testimonial");
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(`${BASE_URL}/testimonials/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update testimonial");
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/testimonials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete testimonial");
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonialList: [],
    selectedTestimonial: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonialList = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getAllTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getTestimonialById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonialById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTestimonial = action.payload.data;
      })
      .addCase(getTestimonialById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.testimonialList.push(action.payload.data);
        }
      })
      .addCase(addTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.testimonialList.findIndex(
            (t) => t._id === action.payload.data._id
          );
          if (index !== -1) {
            state.testimonialList[index] = action.payload.data;
          }
        }
      })
      .addCase(updateTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonialList = state.testimonialList.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testimonialSlice.reducer;
