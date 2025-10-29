import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../baseUrl";
import axios from "axios";

export const getMaincategory = createAsyncThunk(
    "category/getMaincategory",
    async(_,{rejectWithValue})=>{
        try{
            const response = await axios.get(
                `${BASE_URL}/categories`
            )
            return response.data?.data
        }catch(error){
            return rejectWithValue(error.response?.data || "failed to get main categories"

            )
        }
    }
)


const categorySlice = createSlice({
    name : "category",
    initialState:{
        data:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getMaincategory.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getMaincategory.fulfilled,(state, action)=>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(getMaincategory.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default categorySlice.reducer