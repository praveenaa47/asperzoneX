import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const userRegister = createAsyncThunk(
  "userAuth/userRegister",
  async ({ email, name, phone }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user-auth/register`,
        { email, phone, name }
      );
        return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Reg failed"
      );
    }
  }
);


export const userLogin = createAsyncThunk(
  "userAuth/userLogin",
  async ({ phone }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user-auth/login`,
        { phone }
      );
      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);


export const verifyOTP = createAsyncThunk(
  "userAuth/verifyOTP",
  async ({ phone, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user-auth/verify-otp`,
        { phone, otp }
      );

      const { token, user } = response.data; // Remove .data here since your response doesn't have nested data

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(user)); // Fix: change "authToken" to "userData"
      }

      return { token, user };

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed" // Better error message
      );
    }
  }
);

export const userLogout = createAsyncThunk("userAuth/userLogout", async () => {
  localStorage.removeItem("userToken");
  return true;
}); 



const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    token:
      typeof window !== "undefined"
        ? localStorage.getItem("authToken") || null
        : null,
    user: 
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("userData") || "null")
        : null,
    loading: false,
    error: null,
    message: null,
    sessionId: null,
    isAuthenticated:
      typeof window !== "undefined"
        ? !!localStorage.getItem("authToken")
        : false,
  },
  reducers: {
    // Add a reducer to clear errors
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🟢 Register
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "OTP sent successfully";
        state.sessionId = action.payload?.sessionId || null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟢 Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "OTP sent successfully";
        state.sessionId = action.payload?.sessionId || null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🟢 Verify OTP (Token Priority)
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user; // Add user to state
        state.isAuthenticated = true;
        state.message = "OTP verified successfully";
        state.error = null; // Clear any previous errors
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })

      // 🟢 Logout
      .addCase(userLogout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.message = null;
        state.sessionId = null;
      });
  },
});

export const { clearError, clearMessage } = userAuthSlice.actions;
export default userAuthSlice.reducer;