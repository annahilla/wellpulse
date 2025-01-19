import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLocations } from "./locationsSlice";

export const getLocations = createAsyncThunk(
  "locations/getLocations",
  async (_, { dispatch }) => {
    try {
      const response = await fetch("http://localhost:5000/api/locations");

      const data = await response.json();

      if (response.ok) {
        dispatch(setLocations(data.data));
        return data.data;
      } else {
        throw new Error(data.message || "Failed to get locations");
      }
    } catch (error) {
      console.error("Error getting locations:", error);
      throw error;
    }
  }
);
