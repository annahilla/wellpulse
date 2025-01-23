import { createAsyncThunk } from "@reduxjs/toolkit";
import { addHabit, removeHabit, setHabits, setLoading, updateHabit, } from "./habitsSlice";
import { Habit } from "../types/types";
import { RootState } from "./store";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";

export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habit: Habit, { getState, dispatch, rejectWithValue  }) => {
    dispatch(setLoading(true));
    
    let token = (getState() as RootState).user.token;

    if (!token) {
      const user = auth.currentUser;
      if (user) {
        try {
          token = await user.getIdToken(true);
          console.log("Refreshed Firebase token:", token);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          dispatch(setLoading(false));
          return rejectWithValue("No token available or failed to refresh token.");
        }
      }
    }

    if (!token) {
      dispatch(setLoading(false));
      throw new Error("No token available");
    }
    

    try {
      const response = await fetch("http://localhost:5000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(habit),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Habit created successfully!");
        dispatch(addHabit(data.habit));
        dispatch(setLoading(false));
        return data.habit;
      } else {
        toast.error("There was an error creating the habit.");
        dispatch(setLoading(false));
        throw new Error(data.message || "Failed to create habit");
      }
    } catch (error) {
      
      console.error("Error creating habit:", error);
      throw error;
    }
  }
);

export const getHabits = createAsyncThunk(
  "habits/getHabits",
  async (_, { dispatch, getState, rejectWithValue }) => {
    dispatch(setLoading(true));

    let token = (getState() as RootState).user.token;

    if (!token) {
      const user = auth.currentUser;
      if (user) {
        try {
          token = await user.getIdToken(true);
          console.log("Refreshed Firebase token:", token);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          dispatch(setLoading(false));
          return rejectWithValue("No token available or failed to refresh token.");
        }
      }
    }
    
    if (!token) {
      dispatch(setLoading(false));
      throw new Error("No token available");
    }

    try {
      const response = await fetch("http://localhost:5000/api/habits", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setHabits(data.data));
        dispatch(setLoading(false));
        return data.data;
      } else {
        dispatch(setLoading(false));
        throw new Error(data.message || "Failed to get habits");
      }
    } catch (error) {
      console.error("Error getting habits:", error);
      throw error;
    }
  }
);

export const deleteHabit = createAsyncThunk(
  'habits/deleteHabit',
  async (habitId: string, { getState, dispatch, rejectWithValue }) => {
    let token = (getState() as RootState).user.token;

    if (!token) {
      const user = auth.currentUser;
      if (user) {
        try {
          token = await user.getIdToken(true);
          console.log('Refreshed Firebase token:', token);
        } catch (error) {
          console.error('Failed to refresh token:', error);
          return rejectWithValue('No token available or failed to refresh token.');
        }
      }
    }

    if (!token) {
      throw new Error('No token available');
    }

    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(removeHabit(habitId));
        return habitId;
      } else {
        throw new Error(data.message || 'Failed to delete habit');
      }
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  }
);

export const updateHabitAsync = createAsyncThunk(
  'habits/updateHabit',
  async ({ habitId, habitData }: { habitId: string; habitData: Habit }, { getState, dispatch, rejectWithValue }) => {
    let token = (getState() as RootState).user.token;

    console.log("Data being sent:", habitData);

    if (!token) {
      const user = auth.currentUser;
      if (user) {
        try {
          token = await user.getIdToken(true);
          console.log("Refreshed Firebase token:", token);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          return rejectWithValue("No token available or failed to refresh token.");
        }
      }
    }

    if (!token) {
      throw new Error("No token available");
    }

    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(habitData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(updateHabit(data.data));
        toast.success("Habit updated successfully!");
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to update habit');
      }
    } catch (error) {
      toast.error("There was an error updating the habit.");
      console.error('Error updating habit:', error);
      throw error;
    }
  }
);
