import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// ✅ Get All Carousels
export const getAllCarousels = createAsyncThunk(
  "carousels/getAllCarousels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/carousels`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load carousel");
    }
  }
);

// ✅ Get Carousel By ID
export const getCarouselById = createAsyncThunk(
  "carousels/getCarouselById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/carousels/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch carousel"
      );
    }
  }
);
// carousel by categoryid
export const getCarouselByCategoryId = createAsyncThunk(
  "carousels/getCarouselByCategoryId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/carousels/category/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch carousel"
      );
    }
  }
);

// ✅ Add Carousel
export const addCarousel = createAsyncThunk(
  "carousels/addCarousel",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${BASE_URL}/carousels`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add carousel");
    }
  }
);

// ✅ Update Carousel
export const updateCarousel = createAsyncThunk(
  "carousels/updateCarousel",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(
        `${BASE_URL}/carousels/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update carousel"
      );
    }
  }
);

// ✅ Delete Carousel
export const deleteCarousel = createAsyncThunk(
  "carousels/deleteCarousel",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/carousels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete carousel"
      );
    }
  }
);

const carouselSlice = createSlice({
  name: "carousels",
  initialState: {
    carouselList: [],
    selectedCarousel: null,
    carouselByCategory: [],
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Get All
      .addCase(getAllCarousels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCarousels.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselList = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getAllCarousels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get by ID
      .addCase(getCarouselById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarouselById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCarousel = action.payload.data;
      })
      .addCase(getCarouselById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ✅ Get by category ID

      .addCase(getCarouselByCategoryId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarouselByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselByCategory = action.payload.data || [];
      })
      .addCase(getCarouselByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add
      .addCase(addCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCarousel.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.carouselList.push(action.payload.data);
        }
      })
      .addCase(addCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update
      .addCase(updateCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCarousel.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.carouselList.findIndex(
            (item) => item._id === action.payload.data._id
          );
          if (index !== -1) {
            state.carouselList[index] = action.payload.data;
          }
        }
      })
      .addCase(updateCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete
      .addCase(deleteCarousel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCarousel.fulfilled, (state, action) => {
        state.loading = false;
        state.carouselList = state.carouselList.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteCarousel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default carouselSlice.reducer;
