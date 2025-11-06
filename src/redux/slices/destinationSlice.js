import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getDestinations = createAsyncThunk(
  "destinations/getAllDestinations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/destinations`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load destinations");
    }
  }
);

export const getSingleDestination = createAsyncThunk(
  "destinations/getSingleDestination",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/destinations/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load destination");
    }
  }
);

export const addDestination = createAsyncThunk(
  "destinations/addDestination",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${BASE_URL}/destinations`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add destination");
    }
  }
);

export const updateDestination = createAsyncThunk(
  "destinations/updateDestination",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(`${BASE_URL}/destinations/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update destination");
    }
  }
);

export const deleteDestination = createAsyncThunk(
  "destinations/deleteDestination",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/destinations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete destination");
    }
  }
);

const destinationSlice = createSlice({
  name: "destinations",
  initialState: {
    data: [],
    singleDestination: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      //  Get All
      .addCase(getDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Get Single
      .addCase(getSingleDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDestination = action.payload.data || null;
      })
      .addCase(getSingleDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Add
      .addCase(addDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDestination.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.data.push(action.payload.data);
        }
      })
      .addCase(addDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDestination.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const updated = action.payload.data;
          const index = state.data.findIndex((item) => item._id === updated._id);
          if (index !== -1) state.data[index] = updated;
        }
      })
      .addCase(updateDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default destinationSlice.reducer;
