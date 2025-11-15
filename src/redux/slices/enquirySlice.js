import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getAllEnquiries = createAsyncThunk(
  "enquiries/getAllEnquiries",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/enquiry`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success) {
        return response.data; 
      } else {
        return { success: true, data: response.data }; 
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load enquiries");
    }
  }
);

export const addEnquiry = createAsyncThunk(
  "enquiries/addEnquiry",
  async (enquiryData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${BASE_URL}/enquiry`, enquiryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success) {
        return response.data; 
      } else {
        return { success: true, data: response.data }; 
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load enquiries");
    }
  }
);

export const getEnquiryById = createAsyncThunk(
  "enquiries/getEnquiryById",
  async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/enquiry/${id}`,  {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        return response.data; 
      } else {
        return { success: true, data: response.data }; 
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch enquiry");
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiries/deleteEnquiry",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/enquiry/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete enquiry");
    }
  }
);

export const updateEnquiryStatus = createAsyncThunk(
  "enquiries/updateEnquiryStatus",
  async ({ id, status, adminNotes }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(
        `${BASE_URL}/enquiry/${id}/status`,
        { status, adminNotes }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
  }
);

const enquirySlice = createSlice({
  name: "enquiries",
  initialState: {
    enquiryList: [],
    selectedEnquiry: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedEnquiry: (state) => {
      state.selectedEnquiry = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get All Enquiries
      .addCase(getAllEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both response structures
        if (action.payload.success) {
          state.enquiryList = action.payload.data || [];
          state.pagination = action.payload.pagination || null;
        } else {
          state.enquiryList = action.payload || [];
        }
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addenquiry

.addCase(addEnquiry.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(addEnquiry.fulfilled, (state, action) => {
  state.loading = false;
  state.enquiryList.push(action.payload.data);
})
.addCase(addEnquiry.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

      
      // Get Enquiry By ID
      .addCase(getEnquiryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnquiryById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both response structures
        if (action.payload.success) {
          state.selectedEnquiry = action.payload.data;
        } else {
          state.selectedEnquiry = action.payload;
        }
      })
      .addCase(getEnquiryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Enquiry
      .addCase(deleteEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.enquiryList = state.enquiryList.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Enquiry Status
      .addCase(updateEnquiryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data || action.payload;
        const index = state.enquiryList.findIndex(
          (item) => item._id === updated._id
        );
        if (index !== -1) {
          state.enquiryList[index] = updated;
        }
        if (state.selectedEnquiry?._id === updated._id) {
          state.selectedEnquiry = updated;
        }
      })
      .addCase(updateEnquiryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedEnquiry } = enquirySlice.actions;
export default enquirySlice.reducer;