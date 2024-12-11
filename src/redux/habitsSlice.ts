import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Habit } from "../types/types";

interface HabitsState {
    habits: Habit[];
    error: string | null;
}

const initialState: HabitsState = {
    habits: [],
    error: null
}

const habitsSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        setHabits: (state, action: PayloadAction<Habit[]>) => {
            state.habits = action.payload;
          },
          setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
          },
          addHabit: (state, action: PayloadAction<Habit>) => {
            state.habits.push(action.payload);
          }
    }
})

export const { setHabits, addHabit } = habitsSlice.actions;

export default habitsSlice.reducer;