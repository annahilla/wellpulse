import { createAsyncThunk } from "@reduxjs/toolkit";
import { addHabit, removeHabit, setHabits, setLoading, updateHabit } from "./habitsSlice";
import { Habit } from "../types/types";
import { RootState } from "./store";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../utils/fetchWithAuth"; // Importem la funció utilitària
import { API_BASE_URL } from '../config/api';

export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habit: Habit, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));

    let token = (getState() as RootState).user.token;

    try {
      const data = await fetchWithAuth(`${API_BASE_URL}/api/habits`, 'POST', token, habit);
      toast.success("Habit created successfully!");
      dispatch(addHabit(data.habit));
      dispatch(setLoading(false));
      return data.habit;
    } catch (error) {
      if(error instanceof Error) {
        toast.error("There was an error creating the habit.");
        dispatch(setLoading(false));
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getHabits = createAsyncThunk(
  "habits/getHabits",
  async (_, { getState, dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    
    let token = (getState() as RootState).user.token;

    try {
      const data = await fetchWithAuth(`${API_BASE_URL}/api/habits`, 'GET', token);
      dispatch(setHabits(data.data));
      dispatch(setLoading(false));
      return data.data;
    } catch (error) {
      if(error instanceof Error) {
        dispatch(setLoading(false));
      return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteHabit = createAsyncThunk(
  'habits/deleteHabit',
  async (habitId: string, { getState, dispatch, rejectWithValue }) => {
    let token = (getState() as RootState).user.token;

    try {
      await fetchWithAuth(`${API_BASE_URL}/api/habits/${habitId}`, 'DELETE', token);
      dispatch(removeHabit(habitId));
      return habitId;
    } catch (error) {
      if(error instanceof Error) {
        toast.error("There was an error deleting the habit.");
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateHabitAsync = createAsyncThunk(
  'habits/updateHabit',
  async ({ habitId, habitData }: { habitId: string; habitData: Habit }, { getState, dispatch, rejectWithValue }) => {
    let token = (getState() as RootState).user.token;

    try {
      const data = await fetchWithAuth(`${API_BASE_URL}/api/habits/${habitId}`, 'PUT', token, habitData);
      dispatch(updateHabit(data.data));
      toast.success("Habit updated successfully!");
      return data.data;
    } catch (error) {
      if(error instanceof Error) {
        toast.error("There was an error updating the habit.");
        return rejectWithValue(error.message);
      }
    }
  }
);
