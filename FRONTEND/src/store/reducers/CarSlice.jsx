import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseurl = import.meta.env.VITE_API_BASE_URL;

// Backend se car fetch karne wala thunk
export const fetchCars = createAsyncThunk("car/fetchCars", async () => {
  const res = await axios.get(`${baseurl}/api/cars`);
  return res.data;
});

const carSlice = createSlice({
  name: "car",
  initialState: {
    cars: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default carSlice.reducer;
