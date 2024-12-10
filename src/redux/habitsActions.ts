import { createAsyncThunk } from "@reduxjs/toolkit";
import { addHabit, setHabits } from "./habitsSlice";
import { Habit } from "../types/types";
import { RootState } from "./store";

export const createHabit = createAsyncThunk(
  "habits/createHabit",
  async (habit: Habit, { dispatch, getState }) => {
    const token = (getState() as RootState).user.token;

    if (!token) {
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
        dispatch(addHabit(data.habit));
        return data.habit;
      } else {
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
  async (_, { dispatch, getState }) => {
    const token = (getState() as RootState).user.token;

    if (!token) {
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
        return data.data;
      } else {
        throw new Error(data.message || "Failed to create habit");
      }
    } catch (error) {
      console.error("Error creating habit:", error);
      throw error;
    }
  }
);
