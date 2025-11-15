import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";


// ✅ Get All Tour Packages
export const getAllTourPackages = createAsyncThunk(
  "tourPackages/getAllTourPackages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/tour-packages`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load tour packages");
    }
  }
);

// ✅ Get Tour Package By ID
export const getTourPackageById = createAsyncThunk(
  "tourPackages/getTourPackageById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/tour-packages/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch tour package");
    }
  }
);

// ✅ Add Tour Package
export const addTourPackage = createAsyncThunk(
  "tourPackages/addTourPackage",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${BASE_URL}/tour-packages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add tour package");
    }
  }
);

// ✅ Update Tour Package
export const updateTourPackage = createAsyncThunk(
  "tourPackages/updateTourPackage",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/tour-packages/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update tour package");
    }
  }
);

// ✅ Delete Tour Package
export const deleteTourPackage = createAsyncThunk(
  "tourPackages/deleteTourPackage",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/tour-packages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete tour package");
    }
  }
);

const tourPackageSlice = createSlice({
  name: "tourPackages",
  initialState: {
    tourPackageList: [],
    selectedTourPackage: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ✅ Get All
      .addCase(getAllTourPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTourPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.tourPackageList = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getAllTourPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Get By ID
      .addCase(getTourPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTourPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTourPackage = action.payload.data;
      })
      .addCase(getTourPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add
      .addCase(addTourPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTourPackage.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.tourPackageList.push(action.payload.data);
        }
      })
      .addCase(addTourPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update
      .addCase(updateTourPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTourPackage.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.tourPackageList.findIndex(
            (item) => item._id === action.payload.data._id
          );
          if (index !== -1) {
            state.tourPackageList[index] = action.payload.data;
          }
        }
      })
      .addCase(updateTourPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete
      .addCase(deleteTourPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTourPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.tourPackageList = state.tourPackageList.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteTourPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tourPackageSlice.reducer;
