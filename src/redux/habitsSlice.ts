import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Habit } from "../types/types";

interface HabitsState {
    habits: Habit[];
}

const initialState: HabitsState = {
    habits: []
}

const habitsSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        setHabits: (state, action: PayloadAction<Habit[]>) => {
            state.habits = action.payload;
          },
          addHabit: (state, action: PayloadAction<Habit>) => {
            state.habits.push(action.payload);
          }
    }
})

export const { setHabits, addHabit } = habitsSlice.actions;

export default habitsSlice.reducer;