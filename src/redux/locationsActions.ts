import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setLocations } from "./locationsSlice";
import { API_BASE_URL } from '../config/api';

export const getLocations = createAsyncThunk(
  "locations/getLocations",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    try {
      const response = await fetch(`${API_BASE_URL}/api/locations`);
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
    } finally {
      dispatch(setLoading(false));
    }
  }
);
