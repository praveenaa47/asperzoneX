import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getDashboardOverview = createAsyncThunk(
  "overview/getDashboardOverview",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(`${BASE_URL}/dashboard/overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;  
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load overview");
    }
  }
);

const overviewSlice = createSlice({
  name: "overview",
  initialState: {
    overview: null,       
    stats: null,          
    pendingApprovals: null, 
    recentActivities: null, 
    lastUpdated: null,      
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardOverview.fulfilled, (state, action) => {
        state.loading = false;  
        state.overview = action.payload.data || null;    
        state.stats = action.payload.data?.stats || null;
        state.pendingApprovals = action.payload.data?.pendingApprovals || null;
        state.recentActivities = action.payload.data?.recentActivities || null;
        state.lastUpdated = action.payload.data?.lastUpdated || null;
      })
      .addCase(getDashboardOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default overviewSlice.reducer;