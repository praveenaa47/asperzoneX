import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

// ✅ Admin Login API
export const adminLogin = createAsyncThunk(
  "adminAuth/adminLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin-auth/login`,
        { email, password }
      );

      const { token, admin } = response.data.data;

      // ✅ Save Token in localStorage
      if (token) {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(admin));
      }

      return { token, admin };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// ✅ Logout - Clear localStorage
export const adminLogout = createAsyncThunk("adminAuth/adminLogout", async () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  return true;
});

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    admin: typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("adminUser")) || null
      : null,
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("adminToken") || null
        : null,
    loading: false,
    error: null,
    isAuthenticated:
      typeof window !== "undefined"
        ? !!localStorage.getItem("adminToken")
        : false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.token = null;
        state.admin = null;
        state.isAuthenticated = false;
      });
  },
});

export default adminAuthSlice.reducer;
