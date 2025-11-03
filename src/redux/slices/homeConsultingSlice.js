import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

/* ✅ GET ALL Home Consulting */
export const getHomeConsulting = createAsyncThunk(
  "homeConsulting/getHomeConsulting",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/home-consulting`);
      return response.data; // ✅ data + pagination
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load content");
    }
  }
);

/* ✅ GET BY ID */
export const getHomeConsultingById = createAsyncThunk(
  "homeConsulting/getHomeConsultingById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/home-consulting/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch content");
    }
  }
);

/* ✅ CREATE */
export const addHomeConsulting = createAsyncThunk(
  "homeConsulting/addHomeConsulting",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${BASE_URL}/home-consulting`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add content");
    }
  }
);

/* ✅ UPDATE */
export const updateHomeConsulting = createAsyncThunk(
  "homeConsulting/updateHomeConsulting",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(
        `${BASE_URL}/home-consulting/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update content");
    }
  }
);

/* ✅ DELETE */
export const deleteHomeConsulting = createAsyncThunk(
  "homeConsulting/deleteHomeConsulting",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/home-consulting/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete content");
    }
  }
);


/* ✅ SLICE */
const homeConsultingSlice = createSlice({
  name: "homeConsulting",
  initialState: {
    data: [],
    selected: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ✅ GET ALL */
      .addCase(getHomeConsulting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomeConsulting.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getHomeConsulting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ✅ GET BY ID */
      .addCase(getHomeConsultingById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload.data;
      })

      /* ✅ CREATE */
      .addCase(addHomeConsulting.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.data.push(action.payload.data);
        }
      })

      /* ✅ UPDATE */
      .addCase(updateHomeConsulting.fulfilled, (state, action) => {
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

      
      .addCase(deleteHomeConsulting.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (item) => item._id !== action.payload.id
        );
      });
  }
});

export default homeConsultingSlice.reducer;
