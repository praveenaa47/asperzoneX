import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getBlogs = createAsyncThunk(
  "blogs/getBlogsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs`, {
        params: { category: categoryId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load blogs");
    }
  }
);

export const getSingleBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load blogs");
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    data: [],
    singleBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // gellAllblogs
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getBlogsbyId
      .addCase(getSingleBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload.data || null;
      })
      .addCase(getSingleBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
