import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken"); 
  }
  return null;
};



export const getAllads = createAsyncThunk(
  "ads/getAllads",
  async (_, { rejectWithValue }) => {
    try {
             const token = getAuthToken();

      const response = await axios.get(`${BASE_URL}/ads`,{
 headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
     
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to ads");
    }
  }
);



const adsSlice = createSlice({
  name: "ads",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
 extraReducers: (builder) => {
  builder
    .addCase(getAllads.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllads.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload || [];
    })
    .addCase(getAllads.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
},
}
)

export default adsSlice.reducer;