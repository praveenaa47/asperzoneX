import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const getAllCars = createAsyncThunk(
  "cars/getAllCars",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cars`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load cars");
    }
  }
);

export const getCarById = createAsyncThunk(
  "cars/getCarById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/cars/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch car");
    }
  }
);

export const addCar = createAsyncThunk(
  "cars/addCar",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        `${BASE_URL}/cars`,
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
      return rejectWithValue(error.response?.data || "Failed to add car");
    }
  }
);

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.patch(
        `${BASE_URL}/cars/${id}`,
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
      return rejectWithValue(error.response?.data || "Failed to update car");
    }
  }
);

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.delete(
        `${BASE_URL}/cars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete car");
    }
  }
);


const carSlice = createSlice({
  name: "cars",
  initialState: {
    carList: [],
    selectedCar: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {},
 extraReducers: (builder) => {
  builder
    .addCase(getAllCars.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllCars.fulfilled, (state, action) => {
      state.loading = false;
      state.carList = action.payload.data || [];
      state.pagination = action.payload.pagination || null;
    })
    .addCase(getAllCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(getCarById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getCarById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedCar = action.payload.data;
    })
    .addCase(getCarById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(addCar.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addCar.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        state.carList.push(action.payload.data);
      }
    })
    .addCase(addCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(updateCar.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateCar.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        const index = state.carList.findIndex(
          (c) => c._id === action.payload.data._id
        );
        if (index !== -1) {
          state.carList[index] = action.payload.data;
        }
      }
    })
    .addCase(updateCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(deleteCar.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteCar.fulfilled, (state, action) => {
      state.loading = false;
      state.carList = state.carList.filter(
        (item) => item._id !== action.payload.id
      );
    })
    .addCase(deleteCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
});

export default carSlice.reducer;
