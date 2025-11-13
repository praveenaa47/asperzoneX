import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// 🔹 Helper: Get token
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("Usertoken");
  }
  return null;
};

// 🔹 Add to Wishlist
export const AddtoWishlist = createAsyncThunk(
  "wishlist/AddtoWishlist",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${BASE_URL}/wishlist/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add to wishlist");
    }
  }
);

// 🔹 Get Wishlist
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.delete(`${BASE_URL}/wishlist/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to get wishlist");
    }
  }
);

// 🔹 Remove from Wishlist
export const removeWishlist = createAsyncThunk(
  "wishlist/removeWishlist",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${BASE_URL}/wishlist/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove from wishlist");
    }
  }
);

// 🔹 Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: null,
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Get Wishlist
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data || null;
        state.items = action.payload.data?.items || [];
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add to Wishlist
      .addCase(AddtoWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddtoWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const newWishlist = action.payload.data;
        if (newWishlist?.items) {
          state.items = newWishlist.items;
          state.wishlist = newWishlist;
        }
      })
      .addCase(AddtoWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Remove from Wishlist
      .addCase(removeWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const updatedWishlist = action.payload.data;
        if (updatedWishlist?.items) {
          state.items = updatedWishlist.items;
          state.wishlist = updatedWishlist;
        } else {
          // fallback in case API returns empty
          state.items = [];
          state.wishlist = null;
        }
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
