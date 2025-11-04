import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load blogs");
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "blogs/getSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load blog");
    }
  }
);

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(`${BASE_URL}/blogs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add blog");
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.put(`${BASE_URL}/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update blog");
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(`${BASE_URL}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete blog");
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
      // :white_tick: Get All Blogs
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
      // :white_tick: Get Single Blog
      .addCase(getSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload.data || null;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // :white_tick: Add Blog
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.data.push(action.payload.data);
        }
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // :white_tick: Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.data.findIndex(
            (blog) => blog._id === action.payload.data._id
          );
          if (index !== -1) {
            state.data[index] = action.payload.data;
          }
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // :white_tick: Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (blog) => blog._id !== action.payload.id
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default blogSlice.reducer;