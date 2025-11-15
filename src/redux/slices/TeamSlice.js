import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getTeamMembers = createAsyncThunk(
  "team/getTeamMembers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/team`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to load team members"
      );
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    data: [],
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.count = action.payload.count || 0;
      })
      .addCase(getTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamSlice.reducer;
